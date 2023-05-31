/*
Source Code: https://github.com/kevinsqi/react-circular-progressbar
Added By: Venkatesh Pullaganti 😁
gitHub: https://github.com/venkatesh1146
*/

import './styles.module.scss'

export interface ProgressBarPropsTypes {
  size?: number
  progress?: number
  trackWidth?: number
  trackColor?: string
  indicatorWidth?: number
  indicatorColor?: string
  indicatorCap?: 'butt' | 'round' | 'square' | 'inherit'
  label?: string
  labelColor?: string
  spinnerMode?: boolean
  spinnerSpeed?: number
}

const ProgressBar = (props: ProgressBarPropsTypes) => {
  const {
    size = 150,
    progress = 0,
    trackWidth = 10,
    trackColor = `#FFFFFF`,
    indicatorWidth = 10,
    indicatorColor = `#FFAA5C`,
    indicatorCap = `round`,
    label = ``,
    labelColor = `#333`,
    spinnerMode = false,
    spinnerSpeed = 5,
  } = props

  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100)

  const hideLabel = size < 100 || !label.length || spinnerMode ? true : false

  return (
    <div
      className="svg-pi-wrapper"
      style={{
        width: size,
        height: size,
        transform: 'rotateX(180deg) rotateY(0deg) rotateZ(87deg)',
      }}
    >
      <svg className="svg-pi" style={{ width: size, height: size }}>
        <circle
          className="svg-pi-track"
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={trackColor}
          strokeWidth={trackWidth}
        />
        <circle
          className={`svg-pi-indicator ${
            spinnerMode ? 'svg-pi-indicator--spinner' : ''
          }`}
          style={{ animationDuration: (spinnerSpeed * 1000) as any }}
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={indicatorColor}
          strokeWidth={indicatorWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap={indicatorCap}
        />
      </svg>

      {!hideLabel && (
        <div className="svg-pi-label" style={{ color: labelColor }}>
          <span className="svg-pi-label__loading">{label}</span>

          {!spinnerMode && (
            <span className="svg-pi-label__progress">
              {`${progress > 100 ? 100 : progress}%`}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default ProgressBar

import { ThemeProvider } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import cloneDeep from 'clone-deep'
import React, { useEffect, useState } from 'react'

import { lightTheme } from '~/styles/theme'

import Spinner from '../Spinner'
import { H1, P } from '../StyledComponents'

import BasicForm from './BasicForm'
import css from './basic-form.module.scss'

const MetaForm = ({
  buttons,
  cacheId,
  controls,
  components,
  className,
  fns,
  icons,
  title,
  sub_title,
  fetchSchema,
  updateSchema,
  onChange,
  handleError,
  handleSubmit,
  name,
}: IProps) => {
  const { data: schemaResponse } = useQuery([cacheId, '_schema'], fetchSchema, {
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 10,
  })

  const [schema, setSchema] = useState(null)
  useEffect(() => {
    if (schemaResponse?.data) {
      const actualData = cloneDeep(schemaResponse.data)
      const updatedSchema = updateSchema(actualData)
      setSchema(updatedSchema)
    }
  }, [schemaResponse])

  return (
    <div>
      <H1
        style={{ fontFamily: lightTheme.typography.fontFamily }}
        className="bw-heading"
      >
        {title}
      </H1>
      <P
        style={{ fontFamily: lightTheme.typography.fontFamily }}
        className="bw-subheading"
      >
        {sub_title}
      </P>
      <div className={css.basic_form}>
        {/* <Spinner lines={3} isLoading={!schema}/> */}
        {schema && (
          <ThemeProvider theme={lightTheme}>
            <BasicForm
              buttons={buttons}
              className={className}
              controls={controls}
              components={components}
              fns={fns}
              icons={icons}
              schema={schema}
              onChange={onChange}
              onError={handleError}
              onSubmit={(formData) => {
                handleSubmit(formData)
              }}
              name={name}
            />
          </ThemeProvider>
        )}
      </div>
    </div>
  )
}

interface IProps {
  buttons: any
  name?: string
  cacheId: string
  className: string
  controls?: Record<string, JSX.Element>
  components?: Record<string, React.FunctionComponent>
  fns?: Record<string, Function>
  icons?: Record<string, JSX.Element>
  title: string
  sub_title: string
  fetchSchema: () => Promise<any>
  updateSchema: (schema: any) => any
  handleSubmit: (formData: any) => void
  [key: string]: any
}

export default MetaForm

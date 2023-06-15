import MetaForm from '@manojadams/metaforms'
import { ISchema } from '@manojadams/metaforms/dist/constants/model-interfaces'
import React from 'react'

const BasicForm = (props: IProps) => {
  return (
    <MetaForm
      className={'bw-mobile-form ' + props.className}
      components={props.components}
      fns={props.fns}
      schema={props.schema}
      nextResponseMode={'form-data'}
      onSubmit={props.onSubmit}
      buttons={props.buttons}
      onError={props.onError}
      onChange={props.onChange}
      icons={props.icons}
      controls={props.controls}
      name={props.name}
    />
  )
}

interface IProps {
  buttons: any
  name?: string
  className: string
  components?: Record<string, React.FunctionComponent>
  fns?: Record<string, Function>
  schema: ISchema
  onSubmit: (formData: any) => void
  onChange: Function
  onError?: Function
  icons?: Record<string, any>
  controls?: Record<string, any>
}

export default BasicForm

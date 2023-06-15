import { ISchema } from '@manojadams/metaforms/dist/constants/model-interfaces'

class SchemaUtil {
  static readSchema(schema: ISchema, data: any) {
    if (data) {
      schema.fields.forEach((field) => {
        if (data[field.name] !== undefined) {
          field.meta.value = data[field.name]
        }
      })
    }
    return schema
  }

  /**
   *
   * @param value
   * @param options
   * @returns
   */
}

export default SchemaUtil

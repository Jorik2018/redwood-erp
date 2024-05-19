import { Metadata, useMutation } from '@redwoodjs/web'
import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  SubmitHandler,
  FieldError,
  Label,
  FormError,
  useForm
} from '@redwoodjs/forms'
import { CreateContactMutation, CreateContactMutationVariables } from 'types/graphql'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

interface FormValues {
  name: string
  email: string
  message: string
}

const ContactPage = () => {

  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      formMethods.reset()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    create({ variables: { input: data } })
  }
  return (
    <>
      <Metadata title="Contact" description="Contact page" />
      <Toaster />
      <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }} error={error} formMethods={formMethods} >
        <FormError error={error} wrapperClassName="form-error" />
        <label htmlFor="name">Name</label>
        <TextField name="name" required errorClassName="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField name="email" validation={{
          required: true,
          pattern: {
            value: /^[^@]+@[^.]+\..+$/,
            message: 'Please enter a valid email address',
          },
        }} errorClassName="error" />
        <FieldError name="email" className="error" />
        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField name="message" validation={{ required: true }} errorClassName="error" />
        <FieldError name="message" className="error" />
        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
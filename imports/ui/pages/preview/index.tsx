/**
 * This page will act as a preview screen for all our components
 */


import React from 'react';
import * as Validator from '/imports/lib/validator'
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor'
import { Formik, FormikProps } from 'formik'
import { InputField, RadioField, SelectField, AutoCompleteField, CheckField, FormikForm, RadioButtonField, PasswordField } from '/imports/ui/components'


const Signup: React.FC = () => {

    interface AuthInterface {
        fullname: string,
        username: string,
        password: string,
        [key: string]: string
    }
    const authInit: AuthInterface = {
        fullname: "",
        username: "",
        password: "",
    }

    const handleSubmit = (values: AuthInterface) => {
        console.log(values);
        const options = values
        Accounts.createUser({
            email: options.username,
            password: options.password,
            profile: {
                name: options.fullname
            }
        }, (error) => {
            if (error) {
                console.log(error.message);
                return alert(error.message)
            }
            else {
                alert(`SIGNUP WAS SUCCESSFUL FOR ${JSON.stringify(Meteor.user())}`)
            }
        })
    }
    const autoCompleteOptions = [
        { value: "apple" },
        { value: "pear" },
        { value: "orange" },
        { value: "grape" },
        { value: "banana" }
    ]


    return (
        <Formik
            initialValues={authInit}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    handleSubmit(values)
                    actions.setSubmitting(false);
                }, 10000);
            }}
        >
            {(props: FormikProps<any>) => (
                <FormikForm isLoading={props.isSubmitting} analyticName="Signup Form" formProps={props} buttonName="Signup">
                    <InputField label="Your Full Name" placeholder="enter your name" name="fullname" validate={Validator.isRequired} />
                    <InputField label="Your Email" placeholder="enter an email address" name="username" validate={Validator.isEmail} />
                    <PasswordField label="Your Password" placeholder="set a password" name="password" validate={Validator.isRequired} />
                    <RadioField name="type" label="What Org Type" validate={Validator.isRequired} options={["Organization", "Individual"]} />
                    <RadioButtonField name="buttine" label="Radio Button" validate={Validator.isRequired} options={["Customer", "Debtor"]} />
                    <CheckField name="org-box" boxLabel="Check Item" validate={Validator.isRequired} />
                    <SelectField placeholder="Search" name="select" label="Select Label" validate={Validator.isRequired} options={["Organization", "Individual"]} />
                    <AutoCompleteField placeholder="Search" name="downshift" label="Select Label" validate={Validator.isRequired} options={autoCompleteOptions} />
                </FormikForm>
            )}
        </Formik>
    );
}

export default Signup
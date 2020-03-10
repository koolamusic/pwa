import React from 'react'
// import { useHistory } from 'react-router-dom';

import { Box, Heading, Icon } from '@chakra-ui/core'
import * as Validator from '/imports/lib/validator'
import { Formik, FormikProps } from 'formik'
import { InputField, FormikForm } from '/imports/ui/components'


const Create: React.FunctionComponent = (props: any) => {
    // const history = useHistory();
    // const handleSubmit = () => {
    //     history.push('/success');
    // }


    interface ICustomerInterface {
        customerName: string,
        customerAddress: string,
        customerEmail: string,
        customerNumber: string,
        name: string,
        address: string,
        email: string,
        phonenumber: string,
        [key: string]: string
    }
    const authInit: ICustomerInterface = {
        customerName: "",
        customerAddress: "",
        customerEmail: "",
        customerNumber: "",
        name: "",
        address: "",
        email: "",
        phonenumber: "",
    }

    const handleSubmit = (values: ICustomerInterface): void => {
        props.updateState({value: values})
        console.log(values)
    }





    return (
        <Box p={4}>
            

            <Icon name="arrow-back" size="24px" />
            <Heading>Add Customer</Heading>
            

            <Box height="3rem"></Box>
            <Box mb="5"><p>Customer Details </p></Box>

            <Formik
                initialValues={authInit}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        handleSubmit(values)
                        actions.setSubmitting(false);
                    }, 300);
                }}
            >
                {(props: FormikProps<any>) => (
                    <FormikForm isLoading={props.isSubmitting} analyticName="Signup Form" formProps={props} buttonName="SAVE">
                        <InputField label="Customer Name" placeholder="Bank of Industry" name="customerName" validate={Validator.isRequired} />
                        <InputField label="Customer Address" placeholder="44 Lagos Avenue" name="customerAddress" validate={Validator.isRequired} />
                        <InputField label="Customer Phone Number" placeholder="0244-973-237" name="customerNumber" validate={Validator.isNumeric} />
                        <InputField label="Customer Email" placeholder="Customer's Email" name="customerEmail" validate={Validator.isEmail} />
                   

                    <Box height="4rem"></Box>
                    <Box mb="5"><p>Guarantor's Details </p></Box>

                        <InputField label="Name" placeholder="Meltwater" name="name" validate={Validator.isRequired} />
                        <InputField label="Address" placeholder="12 Aluguntugui street" name="address" validate={Validator.isRequired} />
                        <InputField label="Phone Number" placeholder="0244-973-237" name="phonenumber" validate={Validator.isNumeric} />
                        <InputField label="Email" placeholder="Guarantor's Email" name="email" validate={Validator.isEmail} />

                </FormikForm>  
                 )}  
            </Formik>


        </Box>
    );
}

export default Create
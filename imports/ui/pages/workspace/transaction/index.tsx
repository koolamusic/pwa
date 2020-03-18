import React from 'react';
import { Box, Avatar} from "@chakra-ui/core";
import { withTracker } from 'meteor/react-meteor-data';
import styled from '@emotion/styled'
import { LinkButton } from '/imports/ui/components'
import { PageHeader, BreakLayout, CustomerList, TransactionList } from '/imports/ui/components'


//imports for API call
import { Meteor } from 'meteor/meteor'
import { Transactions } from '/imports/api/collections'
import { ITransaction } from '/imports/api/schema';
import path from '/imports/ui/router';


const StyledTransaction = styled.main`
  display: flex;
  flex-direction: column;
`

interface TransactionProps {
  transactions: ITransaction[]
}


class Transaction extends React.Component<TransactionProps> {

  render() {
    console.log(this.props)
    // const { transactions } = this.props

    return (
      <StyledTransaction>
        <PageHeader useHeader title="Your Transactions" />

        {/* Button */}
        {/* <Box my="2">
          <LinkButton />
          <FormButton buttonName="CREATE NEW TRANSACTION" analyticName="Verify" buttonColor="#0B69FF" color="#FFF" handleAction={() => handleSubmit()} />
        </Box> */}
        <Box >
          <LinkButton buttonLink={`${path.workspace.createTransaction}/`} buttonName="Create Transaction" analyticName="" buttonColor="#0B69FF" color="#FFF" />
        </Box >

        <Box mt="10">
        
                {this.props.transactions.map((val, index) => {
                  return (


                    <TransactionList
                      // key={val._id}
                      key={[val.customerName, index].join('-')}
                      analyticName="View a Transaction"
                      customerStatus="10 days to overdue"
                      customerName={val.owner?.profile.name}
                      amount="GHc233"
                      paymentStatus="PAID"
                      overdueAmount="GHC346"
                      overdueStatus="OVERDUE"
                      cardLink={`${path.workspace.transactionView}/view/${val._id}`}
                      iconName="chevron-right"
                      iconSize="24px"
                      
                    />

                  )
                })
                }

        </Box>

      </StyledTransaction>


    )
  }
}



export default withTracker(() => {
  Meteor.subscribe('transactions')
  console.log(Transactions.find().fetch())
  return {
    transactions: Transactions.find().fetch()
  };
})(Transaction);
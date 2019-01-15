import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import lady from "./6.jpg"

const CardExampleImageCard = () => (
  <Card>
    <Image src={lady} />
    <Card.Content>
      <Card.Header>Sadiq Bala-Dole</Card.Header>
      <Card.Description>Vote me as Head boy and you wont regret</Card.Description>
    </Card.Content>
  
  </Card>
)

export default CardExampleImageCard
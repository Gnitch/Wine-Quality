import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

function InfoBox({title,numCases,totalCases}) {
    return (
        <Card className='infoBox'>
            <CardContent>
                <Typography className='infobox__title' color = 'textSecondary'>
                    {title}
                </Typography>
                <h2 className='infoBox__cases'>+{numCases}</h2>
                <Typography className='infobox__total' color = 'textSecondary'>
                    {totalCases} Total
                </Typography>                                
            </CardContent>
        </Card>
    )
}

export default InfoBox

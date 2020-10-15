import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import './Infobox.css'

function InfoBox({title,numCases, isRed, active,totalCases, ...props}) {
    return (
        <Card onClick={props.onClick}   
            className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
            <CardContent>
                <Typography className='infobox__title' color = 'textSecondary'>
                    {title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && 'infobox__cases--green'}`}>
                {numCases}</h2>
                <Typography className='infobox__total' color = 'textSecondary'>
                    {totalCases} Total
                </Typography>                                
            </CardContent>
        </Card>
    )
}

export default InfoBox

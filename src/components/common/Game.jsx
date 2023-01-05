import React from 'react'
import PropTypes from 'prop-types'
import { formatImg } from '../../constants/lib/helpers.js'

function Game({gameId, imgUrl, imgSize, name}) {

    imgUrl = formatImg(imgUrl, imgSize)

    return (
    <div className='game__card' id={gameId}>
        <div className='card__name'>
            <h2>{name}</h2>
        </div>
        <img className='card__img' src={imgUrl} title={name} alt={name} />
    </div >
    )
}

Game.propTypes = {
    gameId: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imgSize: PropTypes.number
}

export default Game
import React from 'react'
import styled, { keyframes } from 'styled-components'

enum LoaderSizes {
    large = 'large',
    medium = 'medium',
    small = 'small'
}

interface DefaultLoaderProps {
    message?: string
    size?: LoaderSizes
}

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

const LoaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
`

const Loader = styled.div<DefaultLoaderProps>`
    width: ${(props) => {
        switch (props.size) {
            case LoaderSizes.large:
                return '100px'
            case LoaderSizes.medium:
                return '50px'
            default:
                return '30px'
        }
    }};
    height: ${(props) => {
        switch (props.size) {
            case LoaderSizes.large:
                return '100px'
            case LoaderSizes.medium:
                return '50px'
            default:
                return '30px'
        }
    }};
    border-radius: 50%;
    border: 5px solid lightgrey;
    border-right: 5px solid blue;
    animation: ${rotate} 1.2s linear infinite;
`

const LoaderMessage = styled.p`
    margin-top: 10px;
`

function DefaultLoader({ message }: DefaultLoaderProps) {
    return (
        <LoaderContainer>
            <Loader />
            <LoaderMessage>{message || ''}</LoaderMessage>
        </LoaderContainer>
    )
}

export default DefaultLoader

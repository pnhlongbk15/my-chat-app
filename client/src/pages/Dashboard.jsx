import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
export default function Dashboard() {
        return (
                <Container>
                        <div className='friend'>
                        <Link to="/friend">Friend</Link>
                        </div>
                        <div className='group'>
                        <Link to="/room">room</Link>
                        </div>
                </Container>
        )
}

const Container = styled.div`
.friend{
        cursor: pointer;
}
.group{
        cursor: pointer;
}
`
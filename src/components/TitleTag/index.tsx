import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import {
    Box,
    Button
} from '@mui/material'
import Image from 'next/image'

interface TitleTagProps {
  title?: string
  isMobile?: boolean
}

const TitleTag: React.FC<TitleTagProps> = ({title, isMobile = false}) => {

  const Tag = styled(Box)`
    font-family: 'Bai Jamjuree';
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    color: #0b0b0b;
  `

  const WrapTitleTag = styled(Box)`
    position: relative;
    align-items: center;
    padding: 15px 20px;
    background: #FFFFFF;
    border: 1px solid transparent;
    border-radius: 8px;
    background-clip: padding-box;
    display: inline-block;

    &:after {
      position: absolute;
      top: -1px; bottom: -1px;
      left: -1px; right: -1px;
      background: linear-gradient(69.17deg, #FFD056 5.96%, #7569FF 62.89%, #FF3C3C 103.54%);
      content: '';
      z-index: -1;
      border-radius: 8px;
    }
  `

  return (
    <WrapTitleTag >
        <Tag fontSize={isMobile ? '12px' : '16px'}>
          {title}
        </Tag>
    </WrapTitleTag>
  )
}

export default TitleTag

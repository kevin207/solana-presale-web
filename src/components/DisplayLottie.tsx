'use client'

import Lottie from 'lottie-react'

interface DisplayLottieProps {
    animationData: any
    width?: string
    height?: string
}
export default function DisplayLottie (porps: DisplayLottieProps) {
  const { animationData, width = '500px', height = '500px' } = porps
  return (
    <Lottie
        animationData={animationData}
        loop={true}
        style={{ width , height }}
    />
  )
}

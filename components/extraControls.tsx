import { useState, useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'
import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Flex,
} from '@chakra-ui/react'
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute,
} from 'react-icons/im'

const ExtraControls = () => {
  const [volume, setVolume] = useState(1)
  const [volumeTemp, setVolumeTemp] = useState(volume)
  const changeVolume = useStoreActions((state: any) => state.changeVolume)

  const onChange = (e) => {
    setVolume(e[0])
  }

  useEffect(() => {
    changeVolume(volume)
  }, [volume, changeVolume])

  const onMute = () => {
    if (volume === 0) {
      setVolume(volumeTemp)
    } else {
      setVolumeTemp(volume)
      setVolume(0)
    }
  }

  function isBetween(number: number, min: number, max: number) {
    return number >= min && number <= max
  }

  const selectVolumeIcon = () => {
    if (volume === 0) {
      return <ImVolumeMute />
    }
    if (isBetween(volume, 0, 0.33)) {
      return <ImVolumeLow />
    }
    if (isBetween(volume, 0.33, 0.66)) {
      return <ImVolumeMedium />
    }
    if (isBetween(volume, 0.66, 1)) {
      return <ImVolumeHigh />
    }
  }

  return (
    <Flex alignItems="center" justifyContent="flex-end" paddingX="5%">
      <Box color="gray.400" marginX="1em" onClick={onMute} cursor="pointer">
        {selectVolumeIcon()}
      </Box>
      <Box width="30%">
        <RangeSlider
          // eslint-disable-next-line jsx-a11y/aria-proptypes
          aria-label={['min', 'max']}
          step={0.01}
          min={0}
          max={1}
          id="volume-range"
          onChange={onChange}
          value={[volume]}
        >
          <RangeSliderTrack bg="gray.800">
            <RangeSliderFilledTrack bg="gray.600" />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
        </RangeSlider>
      </Box>
    </Flex>
  )
}

export default ExtraControls

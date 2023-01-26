import React from 'react'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { AiFillStar } from 'react-icons/ai'
import classes from './Slider.module.scss'

interface ISliderProps {
	images: Array<string>
	rating: string
}

export const Slider: React.FC<ISliderProps> = (props) => {
	const { images, rating } = props

	const [activeSlide, setActiveSlide] = React.useState(0)

	const applyStyle = (index: number): React.CSSProperties | undefined => {
		if (index === activeSlide) {
			return {
				display: `block`,
			}
		}

		return undefined
	}

	const setPrevious = () => {
		if (activeSlide) {
			setActiveSlide(activeSlide - 1)
		}
	}

	const setNext = () => {
		if (activeSlide !== images.length - 1) {
			setActiveSlide(activeSlide + 1)
		}
	}

	const setNewIndex = (index: number) => {
		setActiveSlide(index)
	}

	return (
		<div className={classes.root}>
			<div className={classes.sliderItem}>
				<div className={classes.prev} onClick={setPrevious}>
					<GrPrevious />
				</div>
				<div className={classes.imageBox}>
					{images.map((image, index) => (
						<img
							key={index}
							style={applyStyle(index)}
							src={image}
							alt='sliderItem'
						/>
					))}
					<div className={classes.ratingBox}>
						<div className={classes.rating}>
							<AiFillStar className={classes.icon} />
							<span>{rating}</span>
						</div>
					</div>
				</div>
				<div className={classes.next} onClick={setNext}>
					<GrNext />
				</div>
			</div>
			<div className={classes.buttons}>
				{Array(images.length)
					.fill(null)
					.map((_, index) => {
						return (
							<button
								className={`${classes.button} ${
									activeSlide === index ? classes.active : ``
								}`}
								key={index}
								onClick={() => setNewIndex(index)}
							></button>
						)
					})}
			</div>
		</div>
	)
}

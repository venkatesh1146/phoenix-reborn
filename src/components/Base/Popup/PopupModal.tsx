import { motion } from 'framer-motion'
import React from 'react'

import Image from '../Image'

import css from './PopupModal.module.scss'

import { WealthyImages } from '~/assets'
import { useIsDesktop } from '~/hooks/useIsDesktop'

const zoomOut = {
  hidden: {
    transform: 'scale(0.5)',
    opacity: 0,
    transition: {
      delay: 0.1,
    },
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    transform: 'scale(0.5)',
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
}

const PopupModal = (props: IProps) => {
  const {
    classNames = {},
    close,
    children,
    modalFooter,
    modalHeader,
    shouldShow,
    ...rest
  } = props
  const {
    modal_content = '',
    modal_dialog = '',
    dialog = '',
    modal_header = '',
    modal_body = '',
    modal_footer = '',
    close_btn = '',
  } = classNames

  const isDesktop = useIsDesktop()

  if (!shouldShow) return null
  return (
    <div className={`${css.dialog} ${dialog}`}>
      <motion.div
        className={
          isDesktop
            ? `${css.modal_dialog} ${modal_dialog} `
            : `${css.modal_dialog} ${modal_dialog} line-up-animation-class`
        }
        variants={isDesktop ? zoomOut : {}}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={`${css.modal_content} ${modal_content}`}>
          <div className={`${css.modal_header} ${modal_header}`}>
            {props.modalHeader}
            <Image
              alt="close"
              width={36}
              height={36}
              src={WealthyImages.closeImage}
              className={`${css.close_btn} ${close_btn}`}
              onClick={() => {
                props.close()
              }}
            />
          </div>
          <div className={`${css.modal_body} ${modal_body}`}>
            {props.children}
          </div>
          <div className={`${css.modal_footer} ${modal_footer}`}>
            {props.modalFooter}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

interface IProps {
  children: JSX.Element | Array<JSX.Element>
  close: Function
  modalHeader?: JSX.Element
  modalFooter?: JSX.Element
  shouldShow: boolean
  classNames?: {
    modal_content?: string
    modal_dialog?: string
    dialog?: string
    modal_header?: string
    modal_body?: string
    modal_footer?: string
    close_btn?: string
  }
}

export default PopupModal

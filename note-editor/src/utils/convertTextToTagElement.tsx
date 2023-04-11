import {Tag} from '@components/'
import { ReactElement } from 'react'

const regex = /(#(?! )[|$\!\?a-zA-Z0-9_-]*)/g

export function convertTextToTagElement (text: string): (string | ReactElement)[] {
  return text.split(regex).map((element: string) => {
    if (element.match(regex) != null) {
      return (<Tag>{element}</Tag>)
    }
    else return element
  })
} 





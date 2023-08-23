import React from 'react'
import CIcon from '@coreui/icons-react'
import { ImSpinner2 } from 'react-icons/im';
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [


  {
    component: CNavGroup,
    name: 'Utilisateurs',
    to: '/buttons',

    items: [
      {
        component: CNavItem,
        name: 'Demandes',
        to: '/admin/user/demandes',
        // icon: <ImSpinner2 />
      }

    ],
  },

  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts'
  }

]

export default _nav

import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { createPortal } from 'react-dom'

import { customPropTypes, handleRef, isBrowser, makeDebugger } from '../../lib'
import Ref from '../Ref'

const debug = makeDebugger('portalInner')

/**
 * An inner component that allows you to render children outside their parent.
 */
class PortalInner extends Component {
  static propTypes = {
    /** Primary content. */
    children: PropTypes.node.isRequired,

    /** Called with a ref to the inner node. */
    innerRef: customPropTypes.ref,

    /** The node where the portal should mount. */
    mountNode: PropTypes.any,

    /**
     * Called when the portal is mounted on the DOM
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onMount: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onUnmount: PropTypes.func,
  }

  componentDidMount() {
    debug('componentDidMount()')
    _.invoke(this.props, 'onMount', null, this.props)
  }

  componentWillUnmount() {
    debug('componentWillUnmount()')
    _.invoke(this.props, 'onUnmount', null, this.props)
  }

  handleRef = (c) => {
    debug('handleRef', c)
    handleRef(this.props.innerRef, c)
  }

  render() {
    if (!isBrowser()) return null
    const { children, mountNode = document.body } = this.props

    return createPortal(<Ref innerRef={this.handleRef}>{children}</Ref>, mountNode)
  }
}

export default PortalInner

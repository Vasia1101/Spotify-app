import React, { Fragment } from 'react'
import T from 'prop-types'
import get from 'lodash/get'
import Head from 'next/head'

const metaData = {
    siteName: 'Spotify App',
    title: 'Spotify App',
    // TODO: add a logo  url
    image: '',
    description: 'Spotify App',
    og: {
      type: 'website', // values: article || book || profile || website
      locale: 'en_US',
    },
  };

const Helmet = ({ meta, ...restProps }) => {
  const pageTitle = get(meta, 'title', metaData.title)
  const metaLinks = [
    { name: 'robots', content: 'index, follow' },
    { name: 'description', content: meta.description || metaData.description },
    { name: 'og:locale', content: metaData.og.locale },
    { name: 'og:image', content: meta.image || metaData.image },
    { name: 'og:image:width', content: 200 },
    { name: 'og:image:height', content: 200 },
    { name: 'og:title', content: meta.title || metaData.title, key: 'title' },
    { name: 'og:type', content: meta.pageType || metaData.og.type },
    { name: 'og:url', content: meta.asPath },
    { name: 'og:site_name', content: meta.siteName || metaData.siteName },
    { name: 'og:description', content: meta.description || metaData.description },
  ]

  return (
    <Fragment>
      <Head >
        <title>{pageTitle}</title>
        {metaLinks.map((tag, index) => <meta key={`${index}-${tag.name}`} {...tag} />)}
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Fragment>
  )
}
Helmet.defaultProps = {
  meta: {},
}

Helmet.propTypes = {
  meta: T.object,
}

export default Helmet
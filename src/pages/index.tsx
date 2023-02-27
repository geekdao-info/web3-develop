import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { Link } from '@nextui-org/react'
import { useAccount } from 'wagmi'
import { Account } from '../components/account/index'
import { websites, ListItem } from '../config/websites'
import { Box } from '../components/styles/box'
import { Flex } from '../components/styles/flex'
import { Divider } from '../components/styles/divider'
import { MyCard } from '../components/card'
import { useSidebarContext } from '../components/layout/layout.context'
import { debounce } from '../utils/index'
import { BackToTop } from '../components/backToTop'
import { MyModal } from '../components/modal'

const Home: NextPage = () => {
  const { isConnected } = useAccount()
  const { setActiveMenu } = useSidebarContext()
  const [visible, setVisible] = React.useState(false)
  const [blockHeight, setBlockHeight] = React.useState(0)
  const [isTop, setIsTop] = React.useState(false)
  const [link, setLink] = React.useState('')
  /* 跳转第三方网页弹窗 */
  const modalHandler = (url: string) => { 
    setVisible(true)
    setLink(url)
  }
  /* 监听页面滚动 */
  useEffect(() => {
    /* 计算所有元素块高度 */
    let _tl: Array<any> = []
    websites.map(item => {
      _tl.push({ _key: item.key, start: Number(document.getElementById(item.key)?.offsetTop) - 77, end: Number(document.getElementById(item.key)?.offsetTop) - 77 + Number(document.getElementById(item.key)?.offsetHeight)})
    })
    /* 获取最后一个元素块的高度 */
    setBlockHeight(document.getElementById(websites[websites.length - 1].key)?.offsetHeight || 0)
    /* 滚动函数：根据相应的位置激活菜单 */
    const handleScroll = debounce((e: any) => {
      const distance = e?.target?.scrollTop + 1
      setIsTop(distance > window.innerHeight)
      const _item: any = _tl.filter(i => { return distance >= i.start  && distance < i.end })
      setActiveMenu(_item[0]._key)
    }, 10)
    document.getElementById('scro')?.addEventListener('scroll', handleScroll)
    /* 组件卸载时移除监听 */
    window.addEventListener('beforeunload', () => document.getElementById('scro')?.removeEventListener('scroll', handleScroll))
    return function clieanEvent() {
      window.removeEventListener('beforeunload', () => document.getElementById('scro')?.removeEventListener('scroll', handleScroll))
    }
  }, [])

  return (
    /* 将父元素设置为滚动区域 */
    <Flex id='scro' css={{  overflow: 'scroll' , scrollBehavior: 'smooth', height: 'calc(100vh - var(--nextui--navbarHeight))'}} justify={'start'} direction={'column'}>
      {
        websites.map((item: ListItem) => {
          return (
            <Flex id={item.key} key={item.name} css={{ 'px': '$12', 'pt': '$10' }} direction={'column'}>
              <Link css={{ fontSize: '$2xl', fontWeight: 'bolder', color: '$primary' }} id={item.key}>
                { item.name }
              </Link>
              <Divider />
              <Flex css={{ 'pt': '$5', 'gap': '$12', 'height': '100%', 'flexWrap': 'wrap'}} direction={'row'} justify={'start'}>
                { 
                  item.arr.map((i: any) => {
                    return (<MyCard key={i.key} site={i} click={(url: string) => {modalHandler(url)}} />)
                  })
                }
              </Flex>
            </Flex>
          )
        })
      }
      {/* 占位块：防止滑动到底部，距离不够，导致相应菜单不能激活 */}
      <Box 
        css={{ 
          color: 'transparent',
          lineHeight: `calc(100vh - var(--nextui--navbarHeight) - ${blockHeight}px)`,
          height: `calc(100vh - var(--nextui--navbarHeight) - ${blockHeight}px)`,
          width: 'calc(100vw - 20rem)'
        }}
      >_</Box>
      {/* 回到顶部 */}
      <BackToTop backToTop={isTop} />
      {/* 跳转第三方网址弹窗 */}
      <MyModal url={link} visible={visible} close={(v: boolean) => { setVisible(v) }} />
    </Flex>
  )
}

export default Home
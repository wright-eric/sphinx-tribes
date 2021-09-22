
import MaterialIcon from '@material/react-material-icon';
import React, { useRef, useState, useLayoutEffect } from 'react'
import styled from "styled-components";
import { formatPrice } from '../../../helpers';
import { useIsMobile } from '../../../hooks';
import { Divider, Title, Paragraph } from '../../../sphinxUI';
import GalleryViewer from '../../utils/galleryViewer';
import NameTag from '../../utils/nameTag';
import FavoriteButton from '../../utils/favoriteButton'

export default function OfferSummary(props: any) {
        let { gallery, title, description, price, person, created } = props

        const isMobile = useIsMobile()
        const [envHeight, setEnvHeight] = useState('100%')
        const imgRef: any = useRef(null)

        useLayoutEffect(() => {
                if (imgRef && imgRef.current) {
                        if (imgRef.current?.offsetHeight > 100) {
                                setEnvHeight(imgRef.current?.offsetHeight)
                        }
                }
        }, [imgRef])

        const heart = <FavoriteButton />

        if (isMobile) {
                return <>
                        <Pad>
                                <NameTag {...person}
                                        style={{ marginBottom: 14 }}
                                        created={created} widget={'offer'} />

                                <T>{title || 'No title'}</T>

                                <Divider style={{ marginTop: 22 }} />
                                <Y>
                                        <P>{formatPrice(price)} <B>SAT</B></P>

                                        {heart}
                                </Y>
                                <Divider style={{ marginBottom: 22 }} />

                                <D>{description || 'No description'}</D>

                                <GalleryViewer gallery={gallery} showAll={true} selectable={false} wrap={false} big={true} />
                        </Pad>
                </>
        }

        return <Wrap>
                <GalleryViewer
                        innerRef={imgRef}
                        style={{ width: 507, height: 'fit-content' }}
                        gallery={gallery} showAll={false} selectable={false} wrap={false} big={true} />
                <div style={{ width: 316, padding: 20, overflowY: 'auto', height: envHeight }}>
                        <Pad>
                                <NameTag {...person}
                                        style={{ marginBottom: 14 }}
                                        created={created} widget={'offer'} />
                                <Title>{title}</Title>

                                <Divider style={{ marginTop: 22 }} />
                                <Y>
                                        <P>{formatPrice(price)} <B>SAT</B></P>
                                        {heart}
                                </Y>
                                <Divider style={{ marginBottom: 22 }} />

                                <Paragraph>{description}</Paragraph>
                        </Pad>
                </div>

        </Wrap>

}
const Wrap = styled.div`
display: flex;
width:100%;
height:100%;
min-width:800px;
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 20px;
color: #3C3F41;
justify-content:space-between;

`;
const Pad = styled.div`
        padding:0 20px;
        `;
const Y = styled.div`
        display: flex;
        justify-content:space-between;
        width:100%;
        height:50px;
        align-items:center;
        `;
const T = styled.div`
        font-weight:bold;
        font-size:20px;
        margin: 10px 0;
        `;
const B = styled.span`
        font-weight:300;
        `;
const P = styled.div`
        font-weight:500;
        `;
const D = styled.div`
        color:#5F6368;
        margin: 10px 0 30px;
        `;

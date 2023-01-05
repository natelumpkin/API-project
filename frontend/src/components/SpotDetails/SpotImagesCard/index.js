import { useState } from 'react';

import './SpotImagesCard.css';
import { Modal } from '../../../context/Modal';
import SpotImageGallery from '../../SpotImageGallery';

const SpotImagesCard = ({previewImg, nonPreviewImgs}) => {

  const [showModal, setShowModal] = useState(false)

  console.log('preview image: ', previewImg)
  console.log('non preview images: ', nonPreviewImgs);

  if (!previewImg) {
    return null;
  }
  else
    return (
      <>
      <div onClick={() => setShowModal(true)} className='picture-card'>
        <div className="preview-image">
          {previewImg && <img className='details-preview-image' src={previewImg.url} alt='preview image'/>}
        </div>
        <div className='image-holder-right'>
          <div className='right-image-box top-left'>
            <img
            className='details-other-image top-left-img'
            src={nonPreviewImgs[0]?.url || ''}
            onError={({target})=> {
              target.onerror=null
              target.src='https://64.media.tumblr.com/3c3453410ef214313e58198f4500ffda/878fd4b058e05c10-a1/s1280x1920/d4a6287be8d81eb973b23031037598f3ca5b31cc.jpg'}}/>
          </div>
          <div className='right-image-box top-right'>
            <img
            className='details-other-image top-right-img'
            onError={({target})=> {
              target.onerror=null
              target.src='https://64.media.tumblr.com/3c3453410ef214313e58198f4500ffda/878fd4b058e05c10-a1/s1280x1920/d4a6287be8d81eb973b23031037598f3ca5b31cc.jpg'}}
            src={nonPreviewImgs[1]?.url || ''}/></div>
          <div className='right-image-box bottom-left'>
            <img
            className='details-other-image curved bottom-left-img'
            onError={({target})=> {
              target.onerror=null
              target.src='https://64.media.tumblr.com/3c3453410ef214313e58198f4500ffda/878fd4b058e05c10-a1/s1280x1920/d4a6287be8d81eb973b23031037598f3ca5b31cc.jpg'}}
            src={nonPreviewImgs[2]?.url || ''}/></div>
          <div className='right-image-box bottom-right'>
            <img
            className='details-other-image curved bottom-right-img'
            onError={({target})=> {
              target.onerror=null
              target.src='https://64.media.tumblr.com/3c3453410ef214313e58198f4500ffda/878fd4b058e05c10-a1/s1280x1920/d4a6287be8d81eb973b23031037598f3ca5b31cc.jpg'}}
            src={nonPreviewImgs[3]?.url || ''}/></div>
        </div>
        </div>
        {showModal && (
          <Modal onClose={()=>setShowModal(false)}>
            <SpotImageGallery previewImg={previewImg} nonPreviewImgs={nonPreviewImgs} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    )
  // }
  // else {
  //   return (
  //     <>
  //       <div className="preview-image">
  //         {previewImg && <img className='details-preview-image' src={previewImg.url} alt='preview image'/>}
  //       </div>
  //       <div className="other-images">
  //           {nonPreviewImgs.map(image => (
  //             <img key={image.id} src={image.url} alt='non preview image' />
  //           ))}
  //       </div>
  //     </>
  //   )
  // }
}

export default SpotImagesCard;

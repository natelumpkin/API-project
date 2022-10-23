
import './SpotImagesCard.css';

const SpotImagesCard = ({previewImg, nonPreviewImgs}) => {

  //console.log(nonPreviewImgs);

  if (!previewImg) {
    return null;
  }
  else
    return (
      <>
        <div className="preview-image">
          {previewImg && <img className='details-preview-image' src={previewImg.url} alt='preview image'/>}
        </div>
        <div className='image-holder-right'>
          <div className='right-image-box top-left'><img className='details-other-image top-left-img' src='https://64.media.tumblr.com/3c3453410ef214313e58198f4500ffda/878fd4b058e05c10-a1/s1280x1920/d4a6287be8d81eb973b23031037598f3ca5b31cc.jpg'/></div>
          <div className='right-image-box top-right'><img className='details-other-image top-right-img' src='https://64.media.tumblr.com/1a36d644dd3375cd76cf4f34fac11224/d4a5d001ba0df26f-ab/s500x750/a0f1c035136a0be0014ecdbacb7c26ab74c09adb.jpg'/></div>
          <div className='right-image-box bottom-left'><img className='details-other-image curved bottom-left-img' src='https://64.media.tumblr.com/069463f2d7d25be54473563bddf11d33/4d2d8344dda2ba45-b1/s1280x1920/349a168450a75dcaa25e4784fda1c106f18d54ce.jpg'/></div>
          <div className='right-image-box bottom-right'><img className='details-other-image curved bottom-right-img' src='https://64.media.tumblr.com/faf9a455132dd8e67fe9f07d668333a0/8d38a4aeb2c1670d-54/s1280x1920/fdc909ccfc583fd99125b0c44b6d60dbd13948a8.jpg'/></div>
        </div>
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

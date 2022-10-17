
const SpotImagesCard = ({previewImg, nonPreviewImgs}) => {

  if (!previewImg) {
    return null;
  }
  else if (!nonPreviewImgs.length) {
    return (
      <div className="preview-image">
        {previewImg && <img src={previewImg.url} alt='preview image'/>}
      </div>
    )
  }
  else {
    return (
      <>
        <div className="preview-image">
          {previewImg && <img src={previewImg.url} alt='preview image'/>}
        </div>
        <div className="other-images">
            {nonPreviewImgs.map(image => (
              <img key={image.id} src={image.url} alt='non preview image' />
            ))}
        </div>
      </>
    )
  }
}

export default SpotImagesCard;

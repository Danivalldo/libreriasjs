import {useEffect, useMemo, useRef} from 'react';
import ScratchCardService from "../services/ScratchcardService";

const ScratchCard = ({
  frontImage, 
  backImage,
}) => {
  const containerRef = useRef(null);
  
  const scratchCardSrv = useMemo(()=>{
    return new ScratchCardService();
  }, []);

  useEffect(()=>{
    scratchCardSrv.launch(containerRef.current, {
      frontImage,
      backImage,
    });
  }, []);

  useEffect(()=>{
    scratchCardSrv.updateImages(frontImage, backImage)
  }, [frontImage, backImage]);

  return (
    <div ref={containerRef} style={{height: 400, border: 'solid 1px red'}}></div>
  );
};

export default ScratchCard;
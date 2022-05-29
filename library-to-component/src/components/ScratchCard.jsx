import {useEffect, useMemo, useRef} from 'react';
import ScratchCardService from "../services/ScratchcardService";

const ScratchCard = ({
  frontImage, 
  backImage,
  onScratchStart,
  onScratchEnd,
  onScratching
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
    if(typeof onScratchStart !== 'function'){
      return;
    }
    scratchCardSrv.on('scratchstart', onScratchStart);
  }, [onScratchStart]);

  useEffect(()=>{
    if(typeof onScratchEnd !== 'function'){
      return;
    }
    scratchCardSrv.on('scratchend', onScratchEnd);
  }, [onScratchEnd]);

  useEffect(()=>{
    if(typeof onScratching !== 'function'){
      return;
    }
    scratchCardSrv.on('scratching', onScratching);
  }, [onScratching]);

  useEffect(()=>{
    scratchCardSrv.updateImages(frontImage, backImage)
  }, [frontImage, backImage]);

  return (
    <div ref={containerRef} style={{height: 400, border: 'solid 1px red'}}></div>
  );
};

export default ScratchCard;
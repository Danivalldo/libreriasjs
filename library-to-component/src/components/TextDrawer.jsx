import {useRef, useMemo, useEffect} from 'react';
import TextDrawerService from '../services/TextDrawerService';

const TextDrawer = () => {
  const canvasRef = useRef(null);

  const textDrawerSrv = useMemo(()=>{
    return new TextDrawerService();
  }, []);

  useEffect(()=>{
    console.log('effect')
    if(!canvasRef.current) return;
    textDrawerSrv.init(canvasRef.current);
  }, [canvasRef.current]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TextDrawer;
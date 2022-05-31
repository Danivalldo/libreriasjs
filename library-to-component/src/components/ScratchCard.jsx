import { useEffect, useMemo, useRef } from "react";
import ScratchCardService from "../services/ScratchcardService";

const ScratchCard = ({
  frontImage,
  backImage,
  radius,
  onScratchStart,
  onScratchEnd,
  onScratching,
  className,
  style,
}) => {
  const containerRef = useRef(null);

  const scratchCardSrv = useMemo(() => {
    return new ScratchCardService();
  }, []);

  useEffect(() => {
    scratchCardSrv.launch(containerRef.current, {
      frontImage,
      backImage,
    });
    return () => {
      scratchCardSrv.destroy();
    };
  }, [scratchCardSrv, containerRef]);

  useEffect(() => {
    scratchCardSrv.setBrush(radius);
  }, [radius]);

  useEffect(() => {
    if (typeof onScratchStart !== "function") {
      return;
    }
    scratchCardSrv.on("scratchstart", onScratchStart);
  }, [onScratchStart]);

  useEffect(() => {
    if (typeof onScratchEnd !== "function") {
      return;
    }
    scratchCardSrv.on("scratchend", onScratchEnd);
  }, [onScratchEnd]);

  useEffect(() => {
    if (typeof onScratching !== "function") {
      return;
    }
    scratchCardSrv.on("scratching", onScratching);
  }, [onScratching]);

  useEffect(() => {
    scratchCardSrv.updateImages(frontImage, backImage);
  }, [frontImage, backImage]);

  return (
    <div
      ref={containerRef}
      className={{ ...className }}
      style={{ ...style }}
    ></div>
  );
};

export default ScratchCard;

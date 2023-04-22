import React, { useState, useEffect } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const ApiStatusButton: React.FC = () => {
  const [apiStatus, setApiStatus] = useState("disconnected");
  const [showModal, setShowModal] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  const fetchApiStatus = async () => {
    try {
      const response = await fetch("api/status");
      const data = await response.json();
      setApiStatus(data.status);
    } catch (error) {
      console.error("Error fetching API status:", error);
    }
  };

  useEffect(() => {
    fetchApiStatus();
    const interval = setInterval(fetchApiStatus, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (apiStatus === "connected") {
      closeModal();
    }
  }, [apiStatus]);

  const closeModal = () => {
    if (qrCodeImage) {
      URL.revokeObjectURL(qrCodeImage);
    }
    setShowModal(false);
  };

  const getButtonProperties = () => {
    if (apiStatus === "disconnected") {
      return {
        colorScheme: "red",
        buttonText: "Conectar",
      };
    } else {
      return {
        colorScheme: "green",
        buttonText: "Desconectar",
      };
    }
  };

  const desligar = async () => {
    try {
      const response = await fetch("api/desligar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setApiStatus(data.status);
    } catch (error) {
      console.error("Error fetching API status:", error);
    }
  };
  

  const ligar = async () => {
    try {
      const response = await fetch("api/qrcode");
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setQrCodeImage(imageUrl);
        setShowModal(true);
      } else {
        console.error("Error fetching QR code: ", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  const handleApiButtonClick = async () => {
    if (apiStatus === "disconnected") {
      await ligar();
    } else {
      await desligar();
      setApiStatus("disconnected");
    }
  };

  const { colorScheme, buttonText } = getButtonProperties();

  return (
    <>
      <Button colorScheme={colorScheme} onClick={handleApiButtonClick}>
        {buttonText}
      </Button>
      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>QR Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {qrCodeImage && <img src={qrCodeImage} alt="QR Code" />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ApiStatusButton;

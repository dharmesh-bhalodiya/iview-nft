import styles from "./NftCreator.module.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../api/pinata";
import { Alert, Snackbar } from "@mui/material";

export default function NftCreator() {
  const [imageURL, setImageURL] = useState();
  const [imageFile, setImageFile] = useState();
  const [NFTName, setNFTName] = useState();
  const [NFTDescription, setNFTDescription] = useState();
  const [NFTPrice, setNFTPrice] = useState();
  const [NFTAttributes, setNFTAttributes] = useState([
    { trait_type: "", value: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Function to check if all required form fields are filled
  const formNotFilled = () => {
    return (
      !imageFile ||
      !NFTName ||
      !NFTDescription ||
      !NFTAttributes[0].trait_type ||
      !NFTAttributes[0].value
    );
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Callback function for handling file drop
  const onDrop = useCallback((acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
    setImageURL(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  // Hook for handling file upload via drag and drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "image/png": [".png", ".PNG"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop,
  });

  // Functions for adding, updating, and removing NFT attributes
  const addAttribute = () => {
    const attribute = { trait_type: "", value: "" };
    setNFTAttributes([...NFTAttributes, attribute]);
  };

  const subtractAttribute = (index) => {
    const attributes = [...NFTAttributes];
    attributes.splice(index, index);
    setNFTAttributes(attributes);
  };

  const updateAttribute = (parameter, value, index) => {
    const attributes = [...NFTAttributes];
    attributes[index][parameter] = value;
    setNFTAttributes(attributes);
  };

  // Function for minting the NFT and generating metadata
  const mintNFT = async () => {
    if (formNotFilled()) {
      setError(true);
      return;
    }

    setError(false);
    setIsSubmitting(true);

    try {
      const metadataURL = await generateMetadata();
      setOpenSnackbar(true);
      console.log("metadataURL", metadataURL);
    } catch (e) {
      console.log(e);
      return;
    }
  };
  // Async function to generate metadata for the NFT
  const generateMetadata = async () => {
    const fileURL = await uploadFileToIPFS(imageFile);

    // Create a metadata object with the NFT's description, image file URL, name, and attributes
    const metadata = {
      description: NFTDescription,
      image: fileURL,
      name: NFTName,
      attributes: NFTAttributes,
      price: NFTPrice,
    };

    // Send a POST request to the api/pinJsonToIpfs.js to store the NFT metadata on IPFS
    const metadataURL = await uploadJSONToIPFS(metadata);

    // Return the metadata URL for the NFT
    return metadataURL;
  };

  return (
    // Main page container
    <div className={styles.page_flexBox}>
      <div
        // Check if transaction hash exists to change styling of container
        className={styles.page_container}
      >
        <div className={styles.dropzone_container} {...getRootProps()}>
          <input {...getInputProps()}></input>
          {/* Check if an image is uploaded and display it */}
          {imageURL ? (
            <img alt="" className={styles.nft_image} src={imageURL} />
          ) : isDragActive ? (
            <p className="dropzone-content">Release to drop the files here </p>
          ) : (
            // Default dropzone content
            <div>
              <p className={styles.dropzone_header}>
                Drop your NFT art here, <br /> or{" "}
                <span className={styles.dropzone_upload}>upload</span>
              </p>
              <p className={styles.dropzone_text}>Supports .jpg, .jpeg, .png</p>
            </div>
          )}
        </div>
        <div className={styles.inputs_container}>
          {/* Input field for NFT name */}
          <div className={styles.input_group}>
            <h3 className={styles.input_label}>NAME OF NFT</h3>

            <input
              className={styles.input}
              value={NFTName}
              onChange={(e) => setNFTName(e.target.value)}
              type={"text"}
              placeholder="NFT Title"
            />
          </div>
          {/* Input field for NFT description */}
          <div className={styles.input_group}>
            <h3 className={styles.input_label}>DESCRIPTION</h3>

            <input
              className={styles.input}
              onChange={(e) => setNFTDescription(e.target.value)}
              value={NFTDescription}
              placeholder="NFT Description"
            />
          </div>
          {/* Input field for NFT price */}
          <div className={styles.input_group}>
            <h3 className={styles.input_label}>PRICE</h3>
            <input
              className={styles.input}
              type="number"
              onChange={(e) => setNFTPrice(e.target.value)}
              value={NFTPrice}
              placeholder="NFT Price"
              min={0}
            />
          </div>
          {/* Dynamic attribute input fields */}
          <>
            {NFTAttributes &&
              NFTAttributes.map((attribute, index) => {
                return (
                  <div key={index} className={styles.attributes_container}>
                    <div className={styles.attributes_input_container}>
                      <div className={styles.attribute_input_group}>
                        {/* Input field for attribute name */}
                        <h3 className={styles.attribute_input_label}>
                          ATTRIBUTE NAME
                        </h3>
                        <input
                          className={styles.attribute_input}
                          value={attribute.traitType}
                          placeholder={"Background"}
                          onChange={(e) =>
                            updateAttribute("trait_type", e.target.value, index)
                          }
                        ></input>
                      </div>
                      <div className={styles.attribute_input_group}>
                        {/* Input field for attribute value */}
                        <h3 className={styles.attribute_input_label}>
                          ATTRIBUTE VALUE
                        </h3>
                        <input
                          className={styles.attribute_input}
                          value={attribute.value}
                          placeholder={"White"}
                          onChange={(e) =>
                            updateAttribute("value", e.target.value, index)
                          }
                        ></input>
                      </div>
                      {/* Subtract attribute button */}

                      <div className={styles.subtract_button_container}>
                        <img
                          onClick={() => subtractAttribute(index)}
                          className={styles.minus_circle}
                          src="https://static.alchemyapi.io/images/cw3d/Icon%20Dark/Small/minus-circle-contained-s.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </>

          <div className={styles.button_container}>
            <div className={styles.button} onClick={() => addAttribute()}>
              Add attribute
            </div>
          </div>

          <div>
            <div>
              <button
                className={
                  isSubmitting
                    ? styles.submit_button_submitting
                    : styles.submit_button
                }
                disabled={isSubmitting}
                onClick={async () => await mintNFT()}
              >
                {isSubmitting ? "Minting NFT" : "Mint NFT"}
              </button>
              {error ? (
                <p className={styles.error}>One or more fields is blank</p>
              ) : null}
            </div>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                sx={{ width: "100%" }}
              >
                Your NFT Successfully Minted !!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
}

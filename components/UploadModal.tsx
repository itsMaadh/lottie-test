import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LoadingButton from "./LoadingButton";
import { getApolloContext, useMutation } from "@apollo/client";
import Notification from "./Notification";
import { SaveLottieMutation } from "../graphql/saveLottieMutation";
import { GetSignedUrlQuery } from "../graphql/getSignedUrlQuery";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";

export default function UploadModal() {
  const { client } = useContext(getApolloContext());
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notificationData, setNotificationData] = useState({
    mainText: null,
    subText: null,
    success: null,
    visible: false,
  });
  const cancelButtonRef = useRef(null);

  // GraphQL mutation for saving the lottie to database
  const [saveLottie] = useMutation(SaveLottieMutation, {
    onCompleted: () => {},
    onError: () => {},
  });

  // Open/Close modal
  const toggleModal = (open: boolean): void => {
    setFile(null);
    setError(null);
    setOpen(open);
  };

  // function called on upload button
  const uploadLottie = async (e) => {
    e.preventDefault();
    const description = e.target?.description.value;
    const isFormValid = file && description;
    if (!isFormValid) {
      setError("Please fill the fields first!");
    } else {
      setLoading(true);
      setError(null);
      // GraphQL query for fetching the S3 signed URL
      const s3Url = await client.query({ query: GetSignedUrlQuery });
      // Upload to S3 and save to DB
      await saveToDatabase(description, s3Url.data.signedUrl.signedUrl);
      setLoading(false);
      toggleModal(false);
    }
  };

  // PUT request to signed URL to upload file
  const uploadToS3 = async (file: File, signedUrl: string): Promise<void> => {
    await fetch(signedUrl, {
      method: "PUT",
      body: file,
    });
  };

  // Run mutation to save to database
  const saveToDatabase = async (description: string, signedUrl: string) => {
    await uploadToS3(file, signedUrl);
    try {
      await saveLottie({
        variables: {
          createLottieInput: {
            title: description,
            assetUrl: signedUrl.split("?")[0],
          },
        },
      });
      setNotificationData({
        mainText: "Successfully uploaded file!",
        subText: "Your Lottie will now be visible from our site.",
        success: true,
        visible: true,
      });
    } catch {
      setNotificationData({
        mainText: "Could not upload file!",
        subText: "We could not upload your Lottie!",
        success: false,
        visible: true,
      });
    } finally {
      // Close notification after 3s
      setTimeout(() => {
        setNotificationData({ ...notificationData, visible: false });
      }, 3000);
    }
  };

  return (
    <>
      <button
        className="bg-lf-teal duration-150 text-base font-semibold tracking-wide hover:bg-lf-teal-dark hover:shadow-lg sm:text-lg text-white rounded-md py-4 px-8 sm:py-3 sm:px-16"
        onClick={() => setOpen(true)}
      >
        Upload lottie
      </button>
      {notificationData.visible && (
        <Notification
          mainText={notificationData.mainText}
          subText={notificationData.subText}
          success={notificationData.success}
          onClose={() =>
            setNotificationData({ ...notificationData, visible: false })
          }
        />
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto font-lf-font"
          initialFocus={cancelButtonRef}
          open={open}
          onClose={() => toggleModal(false)}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/*Transition overlay when closing and opening modal*/}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/*Transition for opening and closing the modal*/}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form onSubmit={uploadLottie}>
                  <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
                    <div className="md:flex">
                      <div className="w-full">
                        <div className="p-3">
                          <div className="mb-2">
                            {file ? (
                              <div>
                                <Player
                                  autoplay={true}
                                  loop={true}
                                  src={URL.createObjectURL(file)}
                                  id={file.name}
                                  style={{ height: "260px" }}
                                />
                                <button
                                  className="w-full bg-red-600 text-white p-2 rounded mt-4"
                                  onClick={() => setFile(null)}
                                >
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <div className="bg-white pt-2">
                                <div className="flex items-center justify-center sm:items-start">
                                  <label className="w-full h-full flex flex-col items-center px-4 py-6 bg-white text-lf-teal-dark rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-lf-teal-dark hover:text-white">
                                    <Image
                                      src={"/dragdroplogo.png"}
                                      width={60}
                                      height={60}
                                      alt={"Upload Lottie icon"}
                                    />
                                    <span className="mt-6 font-medium leading-normal">
                                      Upload your own Lottie
                                    </span>
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="application/JSON"
                                      onChange={(e) =>
                                        setFile(e.target.files[0])
                                      }
                                    />
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mt-6">
                            <span className="text-sm">
                              Give your Lottie a title:
                            </span>
                            <input
                              name="description"
                              type="text"
                              placeholder="Title"
                              className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300 mt-2"
                            />
                          </div>
                          {error && (
                            <div
                              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                              role="alert"
                            >
                              <span className="block sm:inline">{error}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <LoadingButton
                      type="primary"
                      text="Upload"
                      loading={loading}
                      htmlType={"submit"}
                    />
                    <div ref={cancelButtonRef}>
                      <LoadingButton
                        type="secondary"
                        text="Cancel"
                        onClick={() => toggleModal(false)}
                        loading={false}
                        htmlType={"button"}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

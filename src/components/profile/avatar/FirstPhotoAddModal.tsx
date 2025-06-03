"use client"

import Image from "next/image"
import Avatar from "../../atoms/Avatar"
import Modal from "../../atoms/Modal/Modal"
import Button from "../../atoms/Button/Button"
import { Box, Typography, useMediaQuery } from "@mui/material"

interface IFirstPhotoAddModalProps {
  open: boolean
  isLoading: boolean
  onClose: () => void
  onEditClick: () => void
  onDeleteClick: () => void
  onAddPhotoClick: () => void
  profilePhoto: string | undefined
}

const FirstPhotoAddModal = ({
  open,
  onClose,
  isLoading,
  onEditClick,
  profilePhoto,
  onDeleteClick,
  onAddPhotoClick,
}: IFirstPhotoAddModalProps) => {
  const isMobile = useMediaQuery("(max-width:600px)")

  return (
    <Modal open={open} onClose={onClose} title="Profile Photo" backgroundColor="black" fullScreenOnMobile>
      <Box
        sx={{
          width: { xs: "100%", md: "768px" },
          height: { xs: "calc(100dvh - 72px)", lg: "auto" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 36px",
            position: "relative",
            my: "auto",
          }}
        >
          <Avatar width={276} height={276} image={profilePhoto} />
          {isLoading ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                p: "16px",
                gap: "16px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
            >
              <Box
                sx={{
                  p: 0,
                  m: 0,
                  animation: "spin 1s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "32px",
                  height: "32px",
                }}
              >
                <Image src={"/icons/white-loading.svg"} width={32} height={32} alt="loading svg" />
              </Box>
              <Typography sx={{ color: "neutrals.content", fontSize: "12px", fontWeight: "500" }}>Saving...</Typography>
            </Box>
          ) : null}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: { md: "1px solid #4F5A703D" },
            mt: "20px",
            mb: { md: "-20px" },
            mr: { md: "-20px" },
            ml: { md: "-20px" },
            pt: "8px",
            px: "16px",
            gap: 3,
          }}
        >
          <Button
            variant="text"
            disabled={!profilePhoto || isLoading}
            onClick={onEditClick}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              padding: "8px 10px",
              borderRadius: "8px",
              "&:hover": { background: "#4F5A703D" },
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.13 2.86006C20.5706 2.31934 19.823 2.01709 19.045 2.01709C18.267 2.01709 17.5194 2.31934 16.96 2.86006L3.96 15.8601L2 22.0001L8.19 20.0001L21.13 7.00006C21.6678 6.44114 21.9682 5.69567 21.9682 4.92006C21.9682 4.14445 21.6678 3.39898 21.13 2.84006V2.86006ZM6.77 18.5701L5.42 17.2301L16.64 6.00006L18 7.35006L6.77 18.5701Z"
                fill={isMobile ? "#1DA1F3" : "#ffffff"}
              />
            </svg>
            <Typography sx={{ color: "white", fontSize: "18px", mt: 1 }}>Edit</Typography>
          </Button>
          <Button
            variant="text"
            onClick={onAddPhotoClick}
            disabled={isLoading}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              padding: "8px 10px",
              borderRadius: "8px",
              mr: { lg: "auto" },
              "&:hover": { background: "#4F5A703D" },
            }}
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2108_8367)">
                <path
                  d="M16.5 13C16.5 13.7911 16.2654 14.5645 15.8259 15.2223C15.3864 15.8801 14.7616 16.3928 14.0307 16.6955C13.2998 16.9983 12.4956 17.0775 11.7196 16.9231C10.9437 16.7688 10.231 16.3878 9.67157 15.8284C9.11216 15.269 8.7312 14.5563 8.57686 13.7804C8.42252 13.0044 8.50173 12.2002 8.80448 11.4693C9.10723 10.7384 9.61992 10.1136 10.2777 9.67412C10.9355 9.2346 11.7089 9 12.5 9C13.5609 9 14.5783 9.42143 15.3284 10.1716C16.0786 10.9217 16.5 11.9391 16.5 13ZM22.5 9V20H2.5V9C2.5 8.20435 2.81607 7.44129 3.37868 6.87868C3.94129 6.31607 4.70435 6 5.5 6H6.8L8 3H17L18.2 6H19.5C20.2956 6 21.0587 6.31607 21.6213 6.87868C22.1839 7.44129 22.5 8.20435 22.5 9ZM17.5 13C17.5 12.0111 17.2068 11.0444 16.6573 10.2221C16.1079 9.3999 15.327 8.75904 14.4134 8.3806C13.4998 8.00216 12.4945 7.90315 11.5245 8.09607C10.5546 8.289 9.66373 8.7652 8.96447 9.46447C8.2652 10.1637 7.789 11.0546 7.59607 12.0245C7.40315 12.9945 7.50216 13.9998 7.8806 14.9134C8.25904 15.827 8.8999 16.6079 9.72215 17.1573C10.5444 17.7068 11.5111 18 12.5 18C13.8261 18 15.0979 17.4732 16.0355 16.5355C16.9732 15.5979 17.5 14.3261 17.5 13Z"
                  fill={isMobile ? "#1DA1F3" : "#ffffff"}
                />
              </g>
              <defs>
                <clipPath id="clip0_2108_8367">
                  <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                </clipPath>
              </defs>
            </svg>
            <Typography sx={{ color: "white", fontSize: "18px", mt: 1 }}>Add photo</Typography>
          </Button>
          <Button
            variant="text"
            disabled={!profilePhoto || isLoading}
            onClick={onDeleteClick}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "8px 10px",
              borderRadius: "8px",
              "&:hover": { background: "#4F5A703D" },
              cursor: "pointer",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2108_8373)">
                <path
                  d="M20 4V5H4V4C4 3.73478 4.10536 3.48043 4.29289 3.29289C4.48043 3.10536 4.73478 3 5 3H9C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289C14.8946 2.48043 15 2.73478 15 3H19C19.2652 3 19.5196 3.10536 19.7071 3.29289C19.8946 3.48043 20 3.73478 20 4ZM5 6H19V19C19 19.7956 18.6839 20.5587 18.1213 21.1213C17.5587 21.6839 16.7956 22 16 22H8C7.20435 22 6.44129 21.6839 5.87868 21.1213C5.31607 20.5587 5 19.7956 5 19V6ZM14 18H15V8H14V18ZM9 18H10V8H9V18Z"
                  fill={isMobile ? "#1DA1F3" : "#ffffff"}
                />
              </g>
              <defs>
                <clipPath id="clip0_2108_8373">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <Typography sx={{ color: "white", fontSize: "18px", mt: 1 }}>Delete</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default FirstPhotoAddModal

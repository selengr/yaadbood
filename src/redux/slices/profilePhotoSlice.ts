import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfilePhotoState {
  profilePhoto: string;
  isEditModalOpen: boolean;
  isAvatarModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isDiscardModalOpen: boolean;
  isAddPhotoModalOpen: boolean;
  isFirstPhotoModalOpen: boolean;
  croppedImage: string | null;
}

const initialState: ProfilePhotoState = {
  profilePhoto: '',
  isEditModalOpen: false,
  isAvatarModalOpen: false,
  isDeleteModalOpen: false,
  isDiscardModalOpen: false,
  isAddPhotoModalOpen: false,
  isFirstPhotoModalOpen: true,
  croppedImage: null,
};

export const profilePhotoSlice = createSlice({
  name: 'profilePhoto',
  initialState,
  reducers: {
    setProfilePhoto: (state, action: PayloadAction<string>) => {
      state.profilePhoto = action.payload;
    },
    openEditModal: (state) => {
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
    },
    openAvatarModal: (state) => {
      state.isAvatarModalOpen = true;
    },
    closeAvatarModal: (state) => {
      state.isAvatarModalOpen = false;
    },
    openDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
    openDiscardModal: (state) => {
      state.isDiscardModalOpen = true;
    },
    closeDiscardModal: (state) => {
      state.isDiscardModalOpen = false;
    },
    openAddPhotoModal: (state) => {
      state.isAddPhotoModalOpen = true;
    },
    closeAddPhotoModal: (state) => {
      state.isAddPhotoModalOpen = false;
    },
    openFirstPhotoModal: (state) => {
      state.isFirstPhotoModalOpen = true;
    },
    closeFirstPhotoModal: (state) => {
      state.isFirstPhotoModalOpen = false;
    },
    setCroppedImage: (state, action: PayloadAction<string | null>) => {
      state.croppedImage = action.payload;
    },
    resetAllModals: (state) => {
      state.isEditModalOpen = false;
      state.isAvatarModalOpen = false;
      state.isDeleteModalOpen = false;
      state.isDiscardModalOpen = false;
      state.isAddPhotoModalOpen = false;
      state.isFirstPhotoModalOpen = false;
    },
  },
});

export const {
  setProfilePhoto,
  openEditModal,
  closeEditModal,
  openAvatarModal,
  // closeAvatarModal,
  openDeleteModal,
  closeDeleteModal,
  openDiscardModal,
  closeDiscardModal,
  openAddPhotoModal,
  closeAddPhotoModal,
  openFirstPhotoModal,
  closeFirstPhotoModal,
  setCroppedImage,
  resetAllModals,
} = profilePhotoSlice.actions;

export default profilePhotoSlice.reducer;

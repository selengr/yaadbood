import React, { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import { IoFilterSharp } from "react-icons/io5";
import Modal from '@/components/atoms/Modal/Modal';
import Box from '@mui/material/Box';
import CategorySelection from '../General/CategorySelection';
import { Stack, Typography } from '@mui/material';
import CategoryList from '../General/CategoryList';
import Confirmation from '../atoms/Confirmation';
import { CustomTooltip } from '@/components/atoms';
import { FaPlus } from 'react-icons/fa';

export const Page: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hasOnSaved, setHasOnSaved] = useState(false);
  const [selectedCategoriesList, setSelectedCategoriesList] = useState<string[]>(["cat-1"]);
  const [confirmationModal, setConfirmationModal] = useState(false);


  //qc code: it should move to a seperate file also in real usage should get form server and check this unique id
  const itemsCategoriesList = [
    { id: "cat-1", name: "All" },
    { id: "cat-3", name: "Crypto" },
    { id: "cat-10", name: "دلار آمریکا" },
    { id: "cat-9", name: "Metaverse" },
    { id: "cat-8", name: "NFT" },
    { id: "cat-4", name: "Stocks" },
    { id: "cat-2", name: "Forex" },
    { id: "cat-5", name: "Futures" },
    { id: "cat-6", name: "Bonds" },
    { id: "cat-7", name: "Indices" },
    { id: "cat-11", name: "طلاگرمی" },
    { id: "cat-12", name: "بورس" },
    { id: "cat-13", name: "سکه طلا" },
    { id: "cat-14", name: "خودرو" },
    { id: "cat-15", name: "مسکن" }
  ];


  const toggleHasOnSaved = (status: boolean) => {
    setHasOnSaved(status);
  };
 
  const handleCloseModal = () => {
    setActiveModal(null); 
  };

  const handleButtonClick = (id: string) => {
    setSelectedCategoriesList((prev) => {
      let updatedOptions = [...prev];

      if (id === "cat-1") {
        updatedOptions = updatedOptions.includes(id) ? [] : [id];
      } else {
        if (updatedOptions.includes(id)) {
          updatedOptions = updatedOptions.filter((item) => item !== id);
        } else {
          updatedOptions.push(id);
        }

        if (updatedOptions.length > 0 && updatedOptions.includes("cat-1")) {
          updatedOptions = updatedOptions.filter((item) => item !== "cat-1");
        }

        if (updatedOptions.length === 0) {
          updatedOptions = ["cat-1"];
        }
      }
      if (activeModal === "CategoryChoosenConfirmation") {
        toggleHasOnSaved(true)
      }


      return updatedOptions;
    });
  };

  const remainingCategories = itemsCategoriesList.slice(6);

  const selectedExtraCategories = remainingCategories.filter((item) =>
    selectedCategoriesList.includes(item.id)
  );

  return (
    <Stack sx={{ width: { md: '50%', lg: 'auto' }, border: '0px solid red', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '16px 16px', position: 'relative' }}>
      <Box sx={{ border: '0px solid red', width: '100%', display: 'flex', gap: '8px', paddingRight:{xs:'45px'},lg:'0px' }}> <CategoryList items={itemsCategoriesList} selectedOptions={selectedCategoriesList} onCatSelectClick={handleButtonClick} />
        {selectedExtraCategories.length > 0 &&
          <CustomTooltip title={<div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            {selectedExtraCategories.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "12px", fontWeight: "325", color: "#F1F5F9" }}>
                  {item.name}  {/* ✅ Fix: Correctly render item */}
                </Typography>
                <div
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "3px",
                    backgroundColor: "white",
                    display: selectedExtraCategories.length - 1 === index ? 'none' : 'flex'
                  }}
                />
              </div>
            ))}


          </div>}>
            <Box sx={{
              width: '32px',
              height: '32px',
              maxHeight: '32px',
              minHeight: '32px',
              borderRadius: '32px',
              border: '1px solid #E2E8F0',
              backgroundColor: 'red',
              display: { xs: 'none', lg: 'flex', },
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <FaPlus style={{ width: '8px', height: '8px', color: '64748B' }} />

              <Typography sx={{ color: '#64748B', fontSize: '14px', fontWeight: '500px' }}> {selectedExtraCategories.length}</Typography>

            </Box>
          </CustomTooltip>
        }
      </Box>
      <Box sx={{
        border: '0px solid red', width: { xs: '45px', lg: 'auto' },
        height: '45px', backgroundColor: '#F5F6FA', position: 'absolute',
        right: '0px',
        zIndex: '999',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button
          sx={{
            width: 'auto',
            height: '32px',
            maxHeight: '32px',
            minHeight: '32px',
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: 'white',
            display: 'flex',
            gap: '4px'
          }}
          onClick={() => {
            setActiveModal('CategoryChoosenConfirmation');
          }} 
        >
          <IoFilterSharp color='#64748B' size={16} />
          <Typography sx={{ color: '#64748B', fontSize: '14px', display: { xs: 'none', lg: 'flex' }, fontWeight: '500px' }}>Manage category</Typography>
        </Button>
      </Box >


      <Modal
        key={`component-${activeModal}`}
        open={activeModal === 'CategoryChoosenConfirmation'}
        onClose={
          activeModal === "CategoryChoosenConfirmation" && hasOnSaved
            ? () => setConfirmationModal(true)
            : handleCloseModal
        }
        title="Category Selection"
      >
        <Box
        // sx={{
        //   padding: { xs: 2, sm: 3 }, // Adjust padding as needed
        // }}
        >
          <CategorySelection
            items={itemsCategoriesList}
            selectedOptions={selectedCategoriesList}
            onCatSelectClick={handleButtonClick}
            toggleHasOnSaved={toggleHasOnSaved}
            hasOnSaved={hasOnSaved}
          />
        </Box>
        <Confirmation
          open={confirmationModal}
          additionalStyles={{ width: { xs: '100%', md: '372px' }, zIndex: '10000' }}
          //qc: we should use of texts from seperate file
          title='Unsaved changes!'
          //qc: we should use of texts from seperate file
          description='You have modified your category selection but haven’t confirmed the changes. In case of exit, your changes will be lost. Are you sure you want to leave?'
          handleClose={() => setConfirmationModal(false)}
          handleSubmit={() => {
            setConfirmationModal(false)
            handleCloseModal()
            toggleHasOnSaved(false)

          }}
          cancelText='Keep editing'
          submitText='Leave without saving'
        />
      </Modal>
    </Stack >
  );
};

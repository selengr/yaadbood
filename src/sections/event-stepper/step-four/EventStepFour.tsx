import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
// _mock
import { _abilityList } from '@/_mock/arrays/_yaadbood';
// types
import { IContentModel } from '@/@types/event_maker';
// services
import { callApiContentModel } from '@/services/apis/builder';
import { Box, Checkbox, Stack, Typography, Radio } from '@mui/material';

// --------------------------------------------------------
interface EventStepFourProps {
  delta: number;
  control: { [key: string]: any };
  watch: (name?: string) => any;
  getValues: any;
  setValue: (name: string, value: any) => void;
}
// --------------------------------------------------------
const EventStepFour = ({ delta, control, watch, getValues, setValue }: EventStepFourProps) => {
  const [abilityList, setAbilityList] = useState<IContentModel[]>([]);

  useEffect(() => {
    async function getMediaList() {
      // test
      setAbilityList(_abilityList.content);
      if (window) localStorage.setItem('feature-recovery', JSON.stringify(_abilityList.content));
      // test
      try {
        let res = await callApiContentModel();
        setAbilityList(res.data.content);
        if (window) localStorage.setItem('feature-recovery', JSON.stringify(res.data.content));
      } catch (error) {
        setAbilityList(_abilityList.content);
        if (window) localStorage.setItem('feature-recovery', JSON.stringify(_abilityList.content));
      }
    }
    getMediaList();
  }, []);

  console.log('abilityList', watch('abilityList'));

  return (
    <div>
      <motion.div
        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {abilityList.map((item, index) => {
          return (
            <Box
              sx={{
                p: 2,
                my: 3,
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start',
                flexDirection: 'column',
                bgcolor: (theme) => theme.palette.primary.lighter,
                border: getValues(`abilityList`).some(
                  (abilityItem: { id: number }) => abilityItem.id === item.id
                )
                  ? '1px solid #1758BA'
                  : '',
              }}
            >
              <>
                <Stack
                  direction="row"
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    value={item.name}
                    checked={getValues(`abilityList`).some(
                      (abilityItem: { id: number }) => abilityItem.id === item.id
                    )}
                    onChange={(event: any) => {
                      const abilityList = getValues('abilityList');
                      if (event.target.checked) {
                        setValue('abilityList', [...abilityList, { id: item.id }]);
                      } else {
                        setValue(
                          'abilityList',
                          abilityList.filter(
                            (abilityItem: { id: number }) => abilityItem.id !== item.id
                          )
                        );
                      }
                    }}
                  />

                  <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800] }}>
                    {item.name}
                  </Typography>
                </Stack>
              </>
              <Typography
                variant="caption"
                sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
              >
                {item.description}
              </Typography>

              {getValues(`abilityList`).some(
                      (abilityItem: { id: number }) => abilityItem.id === item.id
                    ) && (
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(4, 1fr)',
                  }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row !important',
                    width: '100%',
                  }}
                >
                  {item.isMultipleChoose && (
                    <>
                      {item.abilityDetailModelList.map((itm, idx) => {
                        return (
                          <Stack
                            direction="row"
                            sx={{
                              display: 'flex',
                              justifyContent: 'start',
                              alignItems: 'center',
                            }}
                          >
                            <Checkbox
                              // value={itm.name}

                              checked={
                                getValues(
                                  `abilityList.${index}.roomAbilityDetailModels.[${idx}]`
                                ) === itm.id
                              }
                              onChange={(event: any) => {
                                if (event.target.checked) {
                                  // set the id field to the item's id when checked
                                  setValue(
                                    `abilityList.${index}.roomAbilityDetailModels.[${idx}]`,
                                    itm.id
                                  );
                                } else {
                                  // remove the id field when unchecked
                                  const roomAbilityDetailModels = getValues(
                                    `abilityList.${index}.roomAbilityDetailModels`
                                  );
                                  const newRoomAbilityDetailModels = roomAbilityDetailModels.filter(
                                    (id: number, idx: number) => idx !== idx
                                  );
                                  setValue(
                                    `abilityList.${index}.roomAbilityDetailModels`,
                                    newRoomAbilityDetailModels
                                  );
                                }
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: (theme) => theme.palette.grey[800] }}
                            >
                              {item.name}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </>
                  )}

                  {!item.isMultipleChoose && (
                    <>
                      {item.abilityDetailModelList.map((itm, idx) => {
                        return (
                          <Stack
                            direction="row"
                            sx={{
                              display: 'flex',
                              justifyContent: 'start',
                              alignItems: 'center',
                            }}
                          >
                            {/* <Radio
                              // value={itm.name}
                              checked={
                                getValues(`abilityList.${index}.roomAbilityDetailModels`) === itm.id
                              }
                              onChange={(event: any) => {
                                setValue(`abilityList.${index}.roomAbilityDetailModels`, itm.id);
                              }}
                            /> */}
                            {/* <Radio
  value={itm.id}
  checked={
    getValues(`abilityList.${index}.roomAbilityDetailModels`)?.includes(itm.id)
  }
  onChange={(event: any) => {
    const abilityList = getValues('abilityList');
    const currentRoomAbilityDetailModels = abilityList[index].roomAbilityDetailModels || [];
    if (event.target.checked) {
      abilityList[index].roomAbilityDetailModels = [...currentRoomAbilityDetailModels, itm.id];
    } else {
      abilityList[index].roomAbilityDetailModels = currentRoomAbilityDetailModels.filter((id: number) => id !== itm.id);
    }
    setValue('abilityList', abilityList);
  }}
/> */}
                            <Radio
                              value={itm.id}
                              checked={
                                getValues(`abilityList.${index}.roomAbilityDetailModels`)?.[0] ===
                                itm.id
                              }
                              onChange={(event: any) => {
                                const abilityList = getValues('abilityList');
                                abilityList[index].roomAbilityDetailModels = [itm.id];
                                setValue('abilityList', abilityList);
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: (theme) => theme.palette.grey[800] }}
                            >
                              {item.name}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </motion.div>
    </div>
  );
};

export default EventStepFour;

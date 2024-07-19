import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IContentModel } from '@/@types/event_maker';
import { callApiContentModel } from '@/services/apis/builder';
import { Box, Checkbox, Stack, Typography, Radio } from '@mui/material';

const EventStepFour = ({
  delta,
  control,
  watch,
  getValues,
  setValue,
}: {
  delta: number;
  control: any;
  watch: any;
  getValues: any;
  setValue: any;
}) => {
  const [abilityList, setAbilityList] = useState<IContentModel[]>([]);

  useEffect(() => {
    async function getMediaList() {
      try {
        let res = await callApiContentModel();
        setAbilityList(res.data.content);
        if(window) localStorage.setItem('feature-recovery',JSON.stringify(res.data.content))
      } catch (error) {}
    }
    getMediaList();
  }, []);

  console.log('watch() reza:>> ', watch());

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
                border: getValues(`abilityList.${index}.id`) === item.id ? '1px solid #1758BA' : '',
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
                    checked={getValues(`abilityList.[${index}].id`) === item.id}
                    onChange={(event: any) => {
                      if (event.target.checked) {
                        setValue(`abilityList.[${index}].id`, item.id);
                      } else {
                        const abilityList = getValues('abilityList');
                        const newAbilityList = abilityList.filter(
                          (item: any, idx: any) => idx !== index
                        );
                        setValue('abilityList', newAbilityList);
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

              {getValues(`abilityList.[${index}].id`) === item.id && (
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
                            <Radio
                              // value={itm.name}
                              checked={
                                getValues(`abilityList.${index}.roomAbilityDetailModels`) === itm.id
                              }
                              onChange={(event: any) => {
                                setValue(`abilityList.${index}.roomAbilityDetailModels`, itm.id);
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

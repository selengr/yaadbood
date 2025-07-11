import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
// types
import { IContentModel } from '@/@types/event_maker';
// mui
import { Box, Checkbox, Divider, Radio, Stack, Typography } from '@mui/material';

// --------------------------------------------------------
interface EventStepFiveProps {
  delta: number;
  control: { [key: string]: any };
  watch: (name?: string) => any;
  getValues: any;
  setValue: (name: string, value: any) => void;
}

const persianMonthNames = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

// --------------------------------------------------------
const EventStepFive = ({ delta, control, watch, getValues, setValue }: EventStepFiveProps) => {
  const [abilityList, setAbilityList] = useState<IContentModel[]>([]);
  useEffect(() => {
    let feature = window && localStorage.getItem('feature-recovery');
    if (feature) setAbilityList(JSON.parse(feature));
  }, []);

  const persianDate = (year: number, month: number, day: number) => {
    const persianYear = year; //+ 621;
    return `${day} ${persianMonthNames[month - 1]}ماه ${persianYear} `;
  };

  const persianDateStr = persianDate(
    getValues('date.year'),
    getValues('date.month'),
    getValues('date.day')
  );

  return (
    <div>
      <motion.div
        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Box
          sx={{
            p: 3,
            my: 3,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            width: '100%',
            position: 'relative',
            // bgcolor: (theme) => theme.palette.primary.lighter, //change needed
          }}
        >
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              justifyContent: 'start',
              width: '100%',
              pb: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#000' }}>
              عنوان یادبود:
            </Typography>
            <Typography variant="body2" sx={{ color: '#393939' }}>
              {getValues('title') ?? '---'}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              justifyContent: 'start',
              width: '100%',
            }}
          >
            <Typography variant="body2" sx={{ color: '#000' }}>
              زمان برگزاری:
            </Typography>
            <Typography variant="body2" sx={{ color: '#393939' }}>
              &nbsp;
              {persianDateStr}
              از ساعت &nbsp;
              {getValues('startTime') ?? '---'}
              &nbsp; به مدت &nbsp;
              {getValues('ceremonyDuration') ?? '---'}
              ساعت
            </Typography>
          </Stack>

          <Stack
            sx={{
              position: 'absolute',
              backgroundColor: 'white',
              width: 110,
              height: 110,
              right: 40,
              bottom: -40,
              borderRadius: '50px 50px 0 0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {getValues('deadImg') && (
              <Image
                src={'http://172.16.11.24:8080/filemanager/' + getValues('deadImg')?.substring(1)}
                width={90}
                height={90}
                alt=""
              />
            )}

            {getValues('deadImg') && (
              <Image src="/assets/images/svg/yaadboodPerson.svg" alt="ddl" width={90} height={90} />
            )}
          </Stack>
        </Box>

        <Box
          sx={{
            p: 2,
            my: 3,
            mt: 6,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            width: '100%',
            // bgcolor: (theme) => theme.palette.primary.lighter, //  change needed
          }}
        >
          {abilityList?.map((item, index) => {
            return (
              <div key={Math.floor(Math.random() * 600)} className="w-full">
                {' '}
                {getValues(`abilityList`)?.map((itm: any, indx: any) => {
                  if (itm.id === item.id) {
                    return (
                      <div key={Math.floor(Math.random() * 600)} className="w-full">
                        <Stack
                          direction="row"
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                        >
                          <Stack sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <>
                              <Stack
                                direction="row"
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'start',
                                  alignItems: 'center',
                                }}
                              >
                                <Checkbox disabled={true} checked={true} />
                                <Typography
                                  variant="body2"
                                  sx={{ color: (theme) => theme.palette.grey[800] }}
                                >
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
                                    {item.abilityDetailModelList.map((itm2, idx2) => {
                                      if (
                                        getValues(
                                          `abilityList.${index}.roomAbilityDetailModels.[${idx2}]`
                                        ) === itm2.id
                                      ) {
                                        return (
                                          <Stack
                                            direction="row"
                                            sx={{
                                              display: 'flex',
                                              justifyContent: 'start',
                                              alignItems: 'center',
                                            }}
                                          >
                                            <Checkbox disabled={true} checked={true} />
                                            <Typography
                                              variant="caption"
                                              sx={{ color: (theme) => theme.palette.grey[800] }}
                                            >
                                              {item.name}
                                            </Typography>
                                          </Stack>
                                        );
                                      }
                                    })}
                                  </>
                                )}

                                {!item.isMultipleChoose && (
                                  <>
                                    {item.abilityDetailModelList.map((itm3, idx3) => {
                                      if (
                                        getValues(
                                          `abilityList.${index}.roomAbilityDetailModels`
                                        ) === itm3.id
                                      ) {
                                        return (
                                          <Stack
                                            direction="row"
                                            sx={{
                                              display: 'flex',
                                              justifyContent: 'start',
                                              alignItems: 'center',
                                            }}
                                          >
                                            <Radio disabled={true} checked={true} />
                                            <Typography
                                              variant="caption"
                                              sx={{ color: (theme) => theme.palette.grey[800] }}
                                            >
                                              {item.name}
                                            </Typography>
                                          </Stack>
                                        );
                                      }
                                    })}
                                  </>
                                )}
                              </Box>
                            )}
                          </Stack>
                          <Typography
                            variant="body2"
                            sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                          >
                            {item.price} تومان
                          </Typography>
                        </Stack>
                        {getValues(`abilityList`)?.length - 1 !== indx && (
                          <Divider sx={{ mb: 2, width: '100%' }} />
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </Box>
      </motion.div>
    </div>
  );
};

export default EventStepFive;

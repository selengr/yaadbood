import callApi from '@/services/axios';
import { useEffect, useState } from 'react';

// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Box, DialogActions, Stack, Typography } from '@mui/material';
import Label from '@/components/label/Label';
import { IOrderSubService } from '@/@types/order';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import SvgColor from '@/components/svg-color/SvgColor';

const OrderStepFour = () => {
     const [orderSubService, setOrderSubService] = useState<IOrderSubService[]>([]);
     const [sessions, setSessions] = useState<any>({}); // Initialize an empty object

     const FireApi = () => {
          const obj = sessions;
          const result = {
               subServicesList: Object.keys(obj).map(Number),
               quantity: Object.values(obj)
          };
          return result;
     };

     const addSession = (itemId: number) => {
          setSessions((prevSessions: any) => {
               const count = prevSessions[itemId] || 1;
               if (count < 30) {
                    return { ...prevSessions, [itemId]: count + 1 };
               }
               return prevSessions;
          });
     };

     const subtractSession = (itemId: number) => {
          setSessions((prevSessions: any) => {
               const count = prevSessions[itemId] || 1;
               if (count > 1) {
                    return { ...prevSessions, [itemId]: count - 1 };
               }
               return prevSessions;
          });
     };

     useEffect(() => {
          fetchOrder();
     }, []);

     useEffect(() => {
          let result = FireApi();
          if (window) localStorage.setItem('order-sub-service', JSON.stringify(result));
     }, [sessions]);

     const fetchOrder = async () => {
          try {
               let orderId = window && localStorage.getItem('order-id');
               let data: AxiosResponse = await callApi().get(`/order/${orderId}/sub-service`);
               let obj: Record<number, number> = {};
               if (Array.isArray(data?.data?.data)) {
                    data.data.data.forEach((item: IOrderSubService) => {
                         obj[item.id] = 1;
                    });
               }
               setOrderSubService(data.data.data);
               setSessions(obj);
               FireApi();
          } catch (error) {
               console.error(error);
          }
     };

     return (
          <>
               {orderSubService?.map((item: IOrderSubService) => (
                    <Stack
                         key={item.id}
                         sx={{
                              display: 'flex'
                         }}
                    >
                         <Stack
                              sx={{
                                   width: '100%',
                                   // backgroundColor: bgColor,
                                   position: 'relative',
                                   borderRadius: 5,
                                   my: 2,
                                   p: 3,
                                   pb: 1,
                                   border: `1px solid #3B82F6`
                              }}
                         >
                              <Box
                                   rowGap={3}
                                   columnGap={2}
                                   display="grid"
                                   gridTemplateColumns={{
                                        xs: 'repeat(1, 1fr)',
                                        sm: 'repeat(2, 1fr)',
                                        md: 'repeat(3, 1fr)',
                                        lg: 'repeat(4, 1fr)'
                                   }}
                                   sx={{ direction: 'rtl' }}
                              >
                                   {/* ------------------------------------------- */}
                                   <Stack
                                        direction="row"
                                        sx={{
                                             display: 'flex',
                                             justifyContent: {
                                                  xs: 'center',
                                                  sm: 'start'
                                             }
                                        }}
                                   >
                                        <Typography
                                             variant="body2"
                                             sx={{
                                                  color: (theme) => theme.palette.grey[500]
                                             }}
                                        >
                                             شناسه زیر خدمت:
                                        </Typography>
                                        <Typography
                                             sx={{
                                                  color: (theme) => theme.palette.grey[900]
                                             }}
                                             variant="body2"
                                        >
                                             &nbsp; {item.id}
                                        </Typography>
                                   </Stack>

                                   <Stack
                                        direction="row"
                                        sx={{
                                             display: 'flex',
                                             justifyContent: {
                                                  xs: 'center',
                                                  sm: 'start'
                                             }
                                        }}
                                   >
                                        <Typography
                                             variant="body2"
                                             sx={{
                                                  color: (theme) => theme.palette.grey[500]
                                             }}
                                        >
                                             کد زیر خدمت:
                                        </Typography>
                                        <Typography
                                             sx={{
                                                  color: (theme) => theme.palette.grey[900]
                                             }}
                                             variant="body2"
                                        >
                                             {item.code}
                                        </Typography>
                                   </Stack>

                                   <Stack
                                        direction="row"
                                        sx={{
                                             display: 'flex',
                                             justifyContent: {
                                                  xs: 'center',
                                                  sm: 'start'
                                             }
                                        }}
                                   >
                                        <Typography
                                             variant="body2"
                                             sx={{
                                                  color: (theme) => theme.palette.grey[500]
                                             }}
                                        >
                                             نام زیر خدمت:
                                        </Typography>
                                        <Typography
                                             sx={{
                                                  color: (theme) => theme.palette.grey[900]
                                             }}
                                             variant="body2"
                                        >
                                             &nbsp; {item.title}
                                        </Typography>
                                   </Stack>
                                   <Stack
                                        direction="row"
                                        sx={{
                                             display: 'flex',
                                             justifyContent: {
                                                  xs: 'center',
                                                  sm: 'start'
                                             }
                                        }}
                                   >
                                        <Typography
                                             variant="body2"
                                             sx={{
                                                  color: (theme) => theme.palette.grey[500]
                                             }}
                                        >
                                             هزینه زیر خدمت:
                                        </Typography>
                                        <Typography
                                             sx={{
                                                  color: (theme) => theme.palette.grey[900]
                                             }}
                                             variant="body2"
                                        >
                                             &nbsp; {item.price}{' '}
                                             <Typography fontSize={12}>تومان</Typography>
                                        </Typography>
                                   </Stack>
                                   <Stack
                                        direction="row"
                                        sx={{
                                             display: 'flex',
                                             justifyContent: {
                                                  xs: 'center',
                                                  sm: 'start'
                                             }
                                        }}
                                   >
                                        <Typography
                                             variant="body2"
                                             sx={{
                                                  color: (theme) => theme.palette.grey[500]
                                             }}
                                        >
                                             نوع جلسات:
                                        </Typography>
                                        <Typography
                                             sx={{
                                                  color: (theme) => theme.palette.grey[900]
                                             }}
                                             variant="body2"
                                        >
                                             &nbsp; {item.sessionTypePersian}
                                        </Typography>
                                   </Stack>

                                   <Stack
                                        direction="row"
                                        sx={{
                                             display: 'flex',
                                             justifyContent: {
                                                  xs: 'start'
                                             }
                                        }}
                                   >
                                        <Typography
                                             variant="body2"
                                             sx={{
                                                  color: (theme) => theme.palette.grey[500]
                                             }}
                                        >
                                             تعداد جلسات: &nbsp;
                                        </Typography>

                                        <>
                                             {item.sessionType === 'multi' && (
                                                  <Image
                                                       className="mx-2 nutra"
                                                       src={
                                                            '/static/assets/icons/svg/ic_add_sessions.svg'
                                                       }
                                                       alt="flight"
                                                       width={23} //automatically provided
                                                       height={23} //automatically provide
                                                       onClick={() => addSession(item.id)}
                                                  />
                                             )}
                                             {item.sessionType === 'single' && (
                                                  <Box
                                                       sx={{
                                                            border: '1px solid #c0c0c0',
                                                            borderRadius: 2,
                                                            height: 25,
                                                            width: 25,
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            background: '#eaeaea',
                                                            color: '#c0c0c0'
                                                       }}
                                                  >
                                                       <span>+</span>
                                                  </Box>
                                             )}
                                             <span className="w-10">
                                                  &nbsp;{' '}
                                                  {(typeof sessions === 'object' &&
                                                       sessions[item.id]) ||
                                                       1}{' '}
                                                  &nbsp;
                                             </span>
                                             {item.sessionType === 'multi' && (
                                                  <Image
                                                       className="mx-4"
                                                       src={
                                                            '/static/assets/icons/svg/ic_minus_sessions.svg'
                                                       }
                                                       alt="flight"
                                                       width={28} //automatically provided
                                                       height={28} //automatically provide
                                                       onClick={() => subtractSession(item.id)}
                                                  />
                                             )}
                                             {item.sessionType === 'single' && (
                                                  <Box
                                                       sx={{
                                                            border: '1px solid #c0c0c0',
                                                            borderRadius: 2,
                                                            height: 25,
                                                            width: 25,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: '#eaeaea',
                                                            color: '#c0c0c0'
                                                       }}
                                                  >
                                                       <span>-</span>
                                                  </Box>
                                             )}
                                        </>
                                   </Stack>
                                   <Stack
                                        direction="row"
                                        sx={{
                                             display: 'flex',
                                             justifyContent: {
                                                  xs: 'center',
                                                  sm: 'start'
                                             }
                                        }}
                                   >
                                        <Typography
                                             variant="body2"
                                             sx={{
                                                  color: (theme) => theme.palette.grey[500]
                                             }}
                                        >
                                             هزینه جلسه:
                                        </Typography>
                                        <Typography
                                             sx={{
                                                  color: (theme) => '#22C55E'
                                             }}
                                             variant="body1"
                                        >
                                             &nbsp;{' '}
                                             {sessions[item.id]
                                                  ? item.price * sessions[item.id]
                                                  : item.price}
                                        </Typography>
                                   </Stack>
                              </Box>
                         </Stack>
                         {/* ------------------------------------------- */}
                    </Stack>
               ))}
          </>
     );
};

export default OrderStepFour;

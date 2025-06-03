'use client';

import { Box, Link, Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';

import Icon from '@/components/atoms/Icon';
import Modal from '@/components/atoms/Modal/Modal';
import { UserState } from '@/types/auth';

import EditIntro from './EditIntro';

const ContactInfo = ({
  editable = true,
  userData
}: {
  editable?: boolean;
  userData: UserState | undefined;
}) => {
  const [contactModal, setContactModal] = useState(false);

  return (
    <>
      <Box
        onClick={() => setContactModal(true)}
        sx={(theme) => ({
          fontSize: '14px',
          cursor: 'pointer',
          color: theme.palette.primary['500'],
          fontWeight: 'medium'
        })}>
        Contact Info
      </Box>
      <Modal
        open={contactModal}
        onClose={() => setContactModal(false)}
        title={`${userData?.firstName} ${userData?.lastName}`}>
        <Box sx={{ width: { xs: '100%', md: '420px' } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={(theme) => ({ fontSize: '18px', color: theme.palette.gray['500'] })}>
              Contact info
            </Typography>
            {editable ? <EditIntro /> : null}
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0px' }}>
              <Icon name='type' w={24} h={24} />
              <Box>
                <Typography
                  sx={(theme) => ({ color: theme.palette.gray['700'], fontWeight: 500, fontSize: '14px' })}>
                  Your URL
                </Typography>
                <Link
                  href={`www.tradido.com/c/${userData?.username}`}
                  sx={(theme) => ({
                    color: theme.palette.primary['500'],
                    fontSize: '12px',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  })}>
                  www.tradido.com/c/{userData?.username}
                </Link>
              </Box>
            </Box>
            {userData?.website ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0px' }}>
                <Icon name='website' w={24} h={24} />
                <Box>
                  <Typography
                    sx={(theme) => ({ color: theme.palette.gray['700'], fontWeight: 500, fontSize: '14px' })}>
                    Website
                  </Typography>
                  <Box sx={{ display: 'flex', gap: '2px' }}>
                    <Link
                      href={userData?.website}
                      target='_blank'
                      sx={(theme) => ({
                        color: theme.palette.primary['500'],
                        fontSize: '12px',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      })}>
                      {userData?.website}
                    </Link>
                    {/* <Typography sx={(theme) => ({ color: theme.palette.gray['400'], fontSize: '12px' })}>
                    (Personal)
                  </Typography> */}
                  </Box>
                </Box>
              </Box>
            ) : null}
            {userData?.phoneNumber ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0px' }}>
                <Icon name='call' w={24} h={24} />
                <Box>
                  <Typography
                    sx={(theme) => ({ color: theme.palette.gray['700'], fontWeight: 500, fontSize: '14px' })}>
                    Phone
                  </Typography>
                  <Box sx={{ display: 'flex', gap: '2px' }}>
                    <Link
                      href={`tel:+${userData?.countryCode || '98'}${userData?.phoneNumber}`}
                      sx={(theme) => ({
                        color: theme.palette.gray['400'],
                        fontSize: '12px',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      })}>
                      (+{userData?.countryCode || '98'}) {userData?.phoneNumber}
                    </Link>
                    <Typography sx={(theme) => ({ color: theme.palette.gray['400'], fontSize: '12px' })}>
                      (Mobile)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : null}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0px' }}>
              <Icon name='sms' w={24} h={24} />
              <Box>
                <Typography
                  sx={(theme) => ({ color: theme.palette.gray['700'], fontWeight: 500, fontSize: '14px' })}>
                  Email
                </Typography>
                <Link
                  href={`mailto:${userData?.email}`}
                  sx={(theme) => ({
                    color: theme.palette.primary['500'],
                    fontSize: '12px',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  })}>
                  {userData?.email}
                </Link>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0px' }}>
              <Icon name='calendar' w={24} h={24} />
              <Box>
                <Typography
                  sx={(theme) => ({ color: theme.palette.gray['700'], fontWeight: 500, fontSize: '14px' })}>
                  Birthday
                </Typography>
                <Typography sx={(theme) => ({ color: theme.palette.gray['400'], fontSize: '12px' })}>
                  {moment(userData?.dateOfBirth).format('MMM D, YYYY')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ContactInfo;

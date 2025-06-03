'use client';
//comonents
import { Header, Main } from './components';
//styles
import { AboutWrapper } from './About.style';
import { useGetUserData } from '@/hooks/user/useGetUserData';
import { useParams } from 'next/navigation';

export default function About() {
  const { username } = useParams();
  const { data: userData } = useGetUserData(username as string);
  return (
    <AboutWrapper component='section'>
      <Header userData={userData?.user} />
      <Main userData={userData?.user} />
    </AboutWrapper>
  );
}

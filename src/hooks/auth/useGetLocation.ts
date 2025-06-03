import { useEffect, useState } from 'react';

import { useAppDispatch } from '@/hooks/util/redux.hooks';
import { pushNewLocations, updateLocations } from '@/redux/slices/locationsSlice';

export default function useGetLocation() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const [toggleProgress, setToggleProgress] = useState(false);

  useEffect(() => {
    const getLocations = async () => {
      // Show progress
      setToggleProgress(true);

      try {
        const result = [
          {
            id: 1,
            countryName: 'Iran',
            countryCode: 'ایران',
            flag: '/images/common/iran-flag.png',
            cities: [
              { id: 1, name: 'Tehran' },
              { id: 2, name: 'Alborz' },
              { id: 3, name: 'Isfahan' },
              { id: 4, name: 'Fars' },
              { id: 5, name: 'Kerman' },
              { id: 6, name: 'Mazandaran' },
              { id: 7, name: 'Gilan' },
              { id: 8, name: 'Khorasan Razavi' },
              { id: 9, name: 'Kermanshah' },
              { id: 10, name: 'East Azerbaijan' },
              { id: 11, name: 'West Azerbaijan' },
              { id: 12, name: 'Yazd' },
              { id: 13, name: 'Chaharmahal and Bakhtiari' },
              { id: 14, name: 'Lorestan' },
              { id: 15, name: 'Khuzestan' },
              { id: 16, name: 'Golestan' },
              { id: 17, name: 'Semnan' },
              { id: 18, name: 'Qazvin' },
              { id: 19, name: 'Qom' },
              { id: 20, name: 'Hamadan' },
              { id: 21, name: 'Ilam' },
              { id: 22, name: 'Bushehr' },
              { id: 23, name: 'Hormozgan' },
              { id: 24, name: 'Sistan and Baluchestan' },
              { id: 25, name: 'Kohgiluyeh and Boyer-Ahmad' },
              { id: 26, name: 'Zanjan' },
              { id: 27, name: 'Ardabil' },
              { id: 28, name: 'North Khorasan' },
              { id: 29, name: 'South Khorasan' },
              { id: 30, name: 'Razavi Khorasan' },
              { id: 31, name: 'Markazi' }
            ]
          }
        ];

        const filterSearched = result
          .map((country) => {
            if (country.countryName.toLowerCase().includes(search.toLowerCase())) {
              return country;
            }

            const filteredCities = country.cities.filter((city) =>
              city.name.toLowerCase().includes(search.toLowerCase())
            );

            if (filteredCities.length > 0) {
              return {
                ...country,
                cities: filteredCities
              };
            }

            return null;
          })
          .filter((country): country is Exclude<typeof country, null> => country !== null); // حذف `null` و اطمینان به TypeScript

        dispatch(updateLocations({ value: filterSearched }));
      } catch (err) {
        setToggleProgress(false);
      }
      setToggleProgress(false);
    };

    getLocations();
  }, [search, dispatch]);

  const updateLocation = async () => {
    setToggleProgress(true);

    try {
      const result = [
        {
          id: 1,
          countryName: 'Iran',
          countryCode: 'ایران',
          flag: '/images/common/iran-flag.png',
          cities: [
            { id: 1, name: 'Tehran' },
            { id: 2, name: 'Alborz' },
            { id: 3, name: 'Isfahan' },
            { id: 4, name: 'Fars' },
            { id: 5, name: 'Kerman' },
            { id: 6, name: 'Mazandaran' },
            { id: 7, name: 'Gilan' },
            { id: 8, name: 'Khorasan Razavi' },
            { id: 9, name: 'Kermanshah' },
            { id: 10, name: 'East Azerbaijan' },
            { id: 11, name: 'West Azerbaijan' },
            { id: 12, name: 'Yazd' },
            { id: 13, name: 'Chaharmahal and Bakhtiari' },
            { id: 14, name: 'Lorestan' },
            { id: 15, name: 'Khuzestan' },
            { id: 16, name: 'Golestan' },
            { id: 17, name: 'Semnan' },
            { id: 18, name: 'Qazvin' },
            { id: 19, name: 'Qom' },
            { id: 20, name: 'Hamadan' },
            { id: 21, name: 'Ilam' },
            { id: 22, name: 'Bushehr' },
            { id: 23, name: 'Hormozgan' },
            { id: 24, name: 'Sistan and Baluchestan' },
            { id: 25, name: 'Kohgiluyeh and Boyer-Ahmad' },
            { id: 26, name: 'Zanjan' },
            { id: 27, name: 'Ardabil' },
            { id: 28, name: 'North Khorasan' },
            { id: 29, name: 'South Khorasan' },
            { id: 30, name: 'Razavi Khorasan' },
            { id: 31, name: 'Markazi' }
          ]
        }
      ];

      dispatch(pushNewLocations({ value: result }));
    } catch (err) {
      setToggleProgress(false);
    }

    setToggleProgress(false);
  };

  return {
    search,
    setSearch,
    toggleProgress,
    updateLocation
  };
}

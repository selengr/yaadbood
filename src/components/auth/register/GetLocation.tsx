import DotSpinner from '@/components/atoms/DotSpinner';
import { useCities, useContries } from '@/hooks/constants/useContriesCities';
import { ICity, ICountry, IState } from '@/networks/constants/types';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchLocation, getDisplayItems, getPlaceholder } from '@/utils/auth/locationUtils'; // Import utility functions
import { Box, Chip, ListItemText, MenuItem, MenuList, Stack, TextField } from "@mui/material";
import { GENERAL_MESSAGES } from '@/constants';

interface LocationData {
  selectedCountry: ICountry | null;
  selectedState: IState | null;
  selectedCity: string | null;
}

const GetLocation = ({
  onChange,
  defaultSearch
}: {
  onChange: (...event: any[]) => void;
  defaultSearch: string;
}) => {
  const { data: countriesData, isLoading } = useContries();
  const [locationData, setLocationData] = useState<LocationData>({
    selectedCountry: null,
    selectedState: null,
    selectedCity: null
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { data: statesData, isLoading: isLoadingStates } = useCities(locationData.selectedCountry?.name);

  const handleCountrySelect = (country: ICountry) => {
    setLocationData({ selectedCountry: country, selectedState: null, selectedCity: null });
    setSearchTerm('');
  };

  const handleStateSelect = (state: IState) => {
    setLocationData((prev) => ({ ...prev, selectedState: state, selectedCity: null }));
    setSearchTerm('');
  };

  const handleCitySelect = (e: any, city: string) => {
    const event = { ...e, target: { value: `${locationData.selectedCountry?.name}, ${city}` } };
    setLocationData((prev) => ({ ...prev, selectedCity: city }));
    onChange(event);
  };

  return (
    <Stack flexDirection={'column'} width={'100%'} maxWidth={'420px'}>
      <Box
        sx={{
          position: 'sticky',
          top: '50px',
          backgroundColor: 'background.paper',
          zIndex: 1,
          paddingBottom: 1
        }}>
        <Stack flexDirection={'row'} gap={1} flexWrap="wrap">
          {locationData.selectedState && (
            <Chip
              label={locationData.selectedState.name}
              onDelete={() =>
                setLocationData((prev) => ({ ...prev, selectedState: null, selectedCity: null }))
              }
            />
          )}
          {locationData.selectedCountry && (
            <Chip
              label={locationData.selectedCountry.name}
              onDelete={() =>
                setLocationData({ selectedCountry: null, selectedState: null, selectedCity: null })
              }
            />
          )}
        </Stack>

        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={getPlaceholder(locationData)} // Use utility function
          sx={{ marginTop: 1, width: '100%' }}
        />
      </Box>

      {isLoading ? (
        <Stack alignItems="center" height={'14rem'} justifyContent="center">
          <DotSpinner />
        </Stack>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            width: '100%'
          }}>
          <MenuList>
            {getDisplayItems(locationData, countriesData?.countries || [], statesData || [], searchTerm)?.map( // Use utility function
              (item: ICountry | IState | ICity) => (
                <MenuItem
                  key={item.id}
                  onClick={(e) => {
                    if (!locationData.selectedCountry) {
                      handleCountrySelect(item as ICountry);
                    } else if (!locationData.selectedState) {
                      handleStateSelect(item as IState);
                    } else {
                      handleCitySelect(e, (item as ICity).name);
                    }
                  }}>
                  <ListItemText
                    primary={item.name}
                    secondary={!locationData.selectedCountry ? (item as ICountry).phonecode : undefined}
                  />
                </MenuItem>
              )
            )}
          </MenuList>
        </Box>
      )}
    </Stack>
  );
};

export default GetLocation;
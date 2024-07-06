import { motion } from 'framer-motion';

const EventStepFive = ({ delta }: { delta: number }) => {
  return (
    <div>
      <motion.div
        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        EventStepFive four
      </motion.div>
    </div>
  );
};

export default EventStepFive;

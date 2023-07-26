import React from 'react';
import './rank-label.scss';

interface Props {
  rank: number;
}

enum ranks {
  low = "low",
  med = "med",
  high = "high"
}

const calcRank10 = (rank: number): ranks => {
  if(rank > 0 && rank < 6)
    return ranks.low;

  else if (rank >= 6 && rank < 7.5)
    return ranks.med;

  else if (rank >= 7.5)
    return ranks.high;

  else
    return ranks.low;
};

const calcRank5 = (rank: number): ranks => {
  if(rank > 0 && rank <= 2)
    return ranks.low;

  else if (rank > 2 && rank <= 3)
    return ranks.med;

  else if (rank >= 4)
    return ranks.high;

  else
    return ranks.low;
};

/**
 * Primary UI component for user interaction
 */
export const RankLabel = ({ rank }: Props) => {
  const rating = calcRank5(rank);

  return (
    <div className={"rank-label " + rating}>
      {rank}
    </div>
  );
};

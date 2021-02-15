import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ShowCorrected from "./ShowCorrected";

type Props = { corpus: string };

const getCorrections = async (url: string, word: string) => {
  try {
    const response = await axios.get(`${url}/corrections?word=${word}`);

    return response.data.corrections;
  } catch (error) {
    console.log(error);
  }
};

const checkSpelling = async (url: string, corpus: string) => {
  try {
    const response = await axios.post(`${url}/checkspelling`, { corpus });

    return response.data.misspellings;
  } catch (error) {
    console.log(error);
  }
};

const checkingSpelling = async (url: string, corpus: string) => {
  const spellingChecked: { start: number; end: number }[] = await checkSpelling(
    url,
    corpus
  );

  const misspelledWords = spellingChecked.map(({ start, end }) => {
    return {
      misspelledWord: corpus.slice(start, end),
    };
  });

  console.log("misspelledWords", misspelledWords);

  const newWords = await Promise.all(
    misspelledWords.map(async ({ misspelledWord }) => {
      const corrections = await getCorrections(url, misspelledWord);
      const correction = corrections ? corrections[0] : misspelledWord;
      return { misspelledWord, correctWord: correction };
    })
  );

  console.log("newWords", newWords);

  const newCorpus = newWords.reduce((acc, { misspelledWord, correctWord }) => {
    return acc.replace(misspelledWord, correctWord);
  }, corpus);

  console.log("newCorpus", newCorpus);

  return newCorpus;
};

const SpellingFixer = ({ corpus }: Props) => {
  const [corrected, setCorrected] = useState<string | null>(null);
  const url = "https://spellchecker.glitch.me";

  useEffect(() => {
    checkingSpelling(url, corpus).then((newCorpus) => setCorrected(newCorpus));
  }, [corpus]);

  return (
    <>
      {corrected === null ? (
        <LoadingSpinner />
      ) : (
        <ShowCorrected text={corrected} />
      )}
    </>
  );
};

export default SpellingFixer;

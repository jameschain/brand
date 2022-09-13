import tw, { styled } from 'twin.macro';

export const Button = styled.button<{ primary?: boolean; disabled?: boolean }>`
  ${tw`border-background rounded-lg border px-5 py-3 hover:bg-hover-background`}
  ${({ primary = false }) =>
    primary ? tw`bg-background text-black` : tw`bg-gray-900 text-white`}
    ${({ disabled = false }) =>
    disabled &&
    tw`bg-gray-700 border-gray-700 text-gray-500 cursor-not-allowed`}
`;

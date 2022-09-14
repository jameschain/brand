import tw, { styled } from 'twin.macro';

export const Button = styled.button<{ primary?: boolean; disabled?: boolean }>`
  ${tw`border-primary text-sm rounded-lg border px-3 py-2 hover:bg-hover-primary flex items-center transition-all duration-500`}
  ${({ primary = false }) =>
    primary
      ? tw`bg-primary text-black`
      : tw`bg-transparent text-white border border-gray-600 hover:bg-gray-800`}
    ${({ disabled = false }) =>
    disabled &&
    tw`bg-gray-700 border-gray-700 text-gray-500 cursor-not-allowed`}
`;

import Layout from "@/components/Layout";

export const getBaseLayout = (page: any, props: any) => <Layout {...props}>{page}</Layout>;

const layouts: any = {
    base: getBaseLayout
};

export default function getLayouts(page: any, layout = 'base', props: any) {
    return layouts[layout](page, props);
}

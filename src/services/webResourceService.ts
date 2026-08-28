import { WebResource } from '@/types/webresource';

const webResourcesData: WebResource[] = [];

export const fetchWebResources = async (forceShuffle: boolean = false): Promise<WebResource[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let resultData = [...webResourcesData];

  if (typeof sessionStorage !== 'undefined') {
    const cachedOrderStr = sessionStorage.getItem('webResourcesOrder');
    if (cachedOrderStr && !forceShuffle) {
      try {
        const cachedOrder: string[] = JSON.parse(cachedOrderStr);
        const orderMap = new Map<string, number>(cachedOrder.map((id, index) => [id, index]));
        resultData.sort((a, b) => {
          const aIdx = orderMap.has(a._id) ? orderMap.get(a._id)! : 99999;
          const bIdx = orderMap.has(b._id) ? orderMap.get(b._id)! : 99999;
          return aIdx - bIdx;
        });
      } catch (e) {
        console.error('Failed to parse cached order', e);
      }
    } else {
      for (let i = resultData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resultData[i], resultData[j]] = [resultData[j], resultData[i]];
      }
      const order = resultData.map(t => t._id);
      sessionStorage.setItem('webResourcesOrder', JSON.stringify(order));
    }
  }

  return resultData;
};

export const fetchWebResourceById = async (id: string): Promise<WebResource | null> => {
  const resources = await fetchWebResources(false);
  return resources.find((t) => t._id.toString() === id) || null;
};
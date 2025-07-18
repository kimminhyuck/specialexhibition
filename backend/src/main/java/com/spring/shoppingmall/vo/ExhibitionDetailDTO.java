package com.spring.shoppingmall.vo;

import java.util.List;

public class ExhibitionDetailDTO {
    private List<PatternDTO> patternDTOList;
    private List<ProductDTO> productDTOList;
    private List<PatternDetailDTO> patternDetailDTOList;

    public List<PatternDTO> getPatternDTOList() {
        return patternDTOList;
    }

    public void setPatternDTOList(List<PatternDTO> patternDTOList) {
        this.patternDTOList = patternDTOList;
    }

    public List<ProductDTO> getProductDTOList() {
        return productDTOList;
    }

    public void setProductDTOList(List<ProductDTO> productDTOList) {
        this.productDTOList = productDTOList;
    }

    public List<PatternDetailDTO> getPatternDetailDTOList() {
        return patternDetailDTOList;
    }

    public void setPatternDetailDTOList(List<PatternDetailDTO> patternDetailDTOList) {
        this.patternDetailDTOList = patternDetailDTOList;
    }

    @Override
    public String toString() {
        return "ExhibitionDetailDTO{" +
                "patternDTOList=" + patternDTOList +
                ", productDTOList=" + productDTOList +
                ", patternDetailDTOList=" + patternDetailDTOList +
                '}';
    }
}

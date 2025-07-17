package com.spring.shoppingmall.vo;

import java.util.List;

public class ProductPatternInfoVO {
    private int prdPtIdx;
    private int prdGrIdx;
    private String prdPtType;
    private String prdPtSort;
    private String prdPtView;
    List<ProductPatternDetailVO> patternDetailVOList;

    public int getPrdPtIdx() {
        return prdPtIdx;
    }

    public void setPrdPtIdx(int prdPtIdx) {
        this.prdPtIdx = prdPtIdx;
    }

    public int getPrdGrIdx() {
        return prdGrIdx;
    }

    public void setPrdGrIdx(int prdGrIdx) {
        this.prdGrIdx = prdGrIdx;
    }

    public String getPrdPtType() {
        return prdPtType;
    }

    public void setPrdPtType(String prdPtType) {
        this.prdPtType = prdPtType;
    }

    public String getPrdPtSort() {
        return prdPtSort;
    }

    public void setPrdPtSort(String prdPtSort) {
        this.prdPtSort = prdPtSort;
    }

    public String getPrdPtView() {
        return prdPtView;
    }

    public void setPrdPtView(String prdPtView) {
        this.prdPtView = prdPtView;
    }

    public List<ProductPatternDetailVO> getPatternDetailVOList() {
        return patternDetailVOList;
    }

    public void setPatternDetailVOList(List<ProductPatternDetailVO> patternDetailVOList) {
        this.patternDetailVOList = patternDetailVOList;
    }

    @Override
    public String toString() {
        return "ProductPatternInfoVO{" +
                "prdPtIdx=" + prdPtIdx +
                ", prdGrIdx=" + prdGrIdx +
                ", prdPtType='" + prdPtType + '\'' +
                ", prdPtSort='" + prdPtSort + '\'' +
                ", prdPtView='" + prdPtView + '\'' +
                ", patternDetailVOList=" + patternDetailVOList +
                '}';
    }
}
